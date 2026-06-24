import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeftIcon, Trash2Icon } from "lucide-react";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data.data);
        setTitle(res.data.data.title);
        setContent(res.data.data.content);
      } catch (error) {
        console.log("Error fetching note:", error);
        toast.error("Failed to load note");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setSaving(true);
    try {
      await api.put(`/notes/${id}`, { title, content });
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error updating note:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    setDeleting(true);
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      console.log("Error deleting note:", error);
      toast.error("Failed to delete note");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen bg-base-200 flex justify-center items-center">
        <p className="text-base-content/60">Note not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to="/" className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex justify-between items-center mb-6">
                <h2 className="card-title text-2xl">Edit Note</h2>
                <button
                  className="btn btn-error btn-sm"
                  onClick={handleDelete}
                  disabled={deleting}
                >
                  {deleting ? (
                    <span className="loading loading-spinner loading-xs" />
                  ) : (
                    <Trash2Icon className="size-4" />
                  )}
                  Delete
                </button>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  placeholder="Note Title"
                  className="input input-bordered w-full"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Content</label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered w-full h-40"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              <div className="card-actions justify-end mt-2">
                <button
                  className="btn btn-primary"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;