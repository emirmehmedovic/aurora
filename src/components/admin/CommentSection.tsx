"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import { MessageSquare, Send, Edit2, Trash2, X } from "lucide-react";
import { toast } from "sonner";

interface Comment {
  id: string;
  content: string;
  authorId: string;
  author: {
    id: string;
    name: string | null;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface CommentSectionProps {
  orderId?: string;
  leadId?: string;
}

export default function CommentSection({ orderId, leadId }: CommentSectionProps) {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [orderId, leadId]);

  const fetchComments = async () => {
    try {
      const params = new URLSearchParams();
      if (orderId) params.set("orderId", orderId);
      if (leadId) params.set("leadId", leadId);

      const response = await fetch(`/api/admin/comments?${params}`);
      if (response.ok) {
        const data = await response.json();
        setComments(data.comments);
      }
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmitting(true);
    try {
      const response = await fetch("/api/admin/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: newComment,
          orderId,
          leadId,
          mentions: [], // Can be enhanced with @mention parsing
        }),
      });

      if (response.ok) {
        const comment = await response.json();
        setComments([comment, ...comments]);
        setNewComment("");
        toast.success("Komentar dodat!");
      } else {
        toast.error("Greška pri dodavanju komentara");
      }
    } catch (error) {
      toast.error("Greška pri dodavanju komentara");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = async (commentId: string) => {
    if (!editContent.trim()) return;

    try {
      const response = await fetch(`/api/admin/comments/${commentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: editContent }),
      });

      if (response.ok) {
        const updated = await response.json();
        setComments(comments.map((c) => (c.id === commentId ? updated : c)));
        setEditingId(null);
        setEditContent("");
        toast.success("Komentar ažuriran!");
      } else {
        toast.error("Greška pri ažuriranju");
      }
    } catch (error) {
      toast.error("Greška pri ažuriranju");
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!confirm("Da li ste sigurni da želite obrisati ovaj komentar?")) return;

    try {
      const response = await fetch(`/api/admin/comments/${commentId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setComments(comments.filter((c) => c.id !== commentId));
        toast.success("Komentar obrisan!");
      } else {
        toast.error("Greška pri brisanju");
      }
    } catch (error) {
      toast.error("Greška pri brisanju");
    }
  };

  const startEdit = (comment: Comment) => {
    setEditingId(comment.id);
    setEditContent(comment.content);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditContent("");
  };

  const isOwnComment = (comment: Comment) => {
    return session?.user?.email === comment.author.email;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-5 h-5 text-gray-500" />
          <h3 className="text-lg font-semibold">Komentari</h3>
        </div>
        <div className="text-center text-gray-500">Učitavanje...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="w-5 h-5 text-gray-500" />
        <h3 className="text-lg font-semibold">Komentari ({comments.length})</h3>
      </div>

      {/* New comment form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Dodaj komentar..."
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#563435] resize-none"
          rows={3}
        />
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            disabled={submitting || !newComment.trim()}
            className="px-4 py-2 bg-[#563435] text-white rounded-xl hover:bg-[#6d4344] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            {submitting ? "Šalje se..." : "Pošalji"}
          </button>
        </div>
      </form>

      {/* Comments list */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            Nema komentara. Budite prvi koji će ostaviti komentar!
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="border border-gray-100 rounded-xl p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="font-semibold text-gray-900">
                    {comment.author.name || comment.author.email}
                  </div>
                  <div className="text-sm text-gray-500">
                    {format(new Date(comment.createdAt), "dd.MM.yyyy HH:mm")}
                    {comment.updatedAt !== comment.createdAt && " (izmenjeno)"}
                  </div>
                </div>
                {isOwnComment(comment) && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(comment)}
                      className="p-1.5 text-gray-500 hover:text-[#563435] hover:bg-gray-100 rounded-lg"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {editingId === comment.id ? (
                <div className="mt-2">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#563435] resize-none"
                    rows={3}
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleEdit(comment.id)}
                      className="px-3 py-1.5 bg-[#563435] text-white text-sm rounded-lg hover:bg-[#6d4344]"
                    >
                      Sačuvaj
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 flex items-center gap-1"
                    >
                      <X className="w-3 h-3" />
                      Otkaži
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-gray-700 whitespace-pre-wrap">{comment.content}</div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
