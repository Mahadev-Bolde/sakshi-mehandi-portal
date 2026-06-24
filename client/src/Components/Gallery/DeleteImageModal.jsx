import React from "react";
import { AlertTriangle, Trash2 } from "lucide-react";

const DeleteImageModal = ({
  imageToDelete,
  deletingId,
  setImageToDelete,
  deleteImage,
}) => {
  if (!imageToDelete) return null;

  return (
    <div
      className="fixed inset-0 z-200 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={() => {
        if (!deletingId) setImageToDelete(null);
      }}>
      <div
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}>
        {" "}
        <div className="p-7 text-center">
          {" "}
          <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-5">
            {" "}
            <AlertTriangle size={30} className="text-red-500" />{" "}
          </div>
          <h2 className="font-serif text-2xl font-bold text-charcoal">
            Delete Gallery Image?
          </h2>
          <p className="text-charcoal/60 text-sm leading-relaxed mt-3">
            This image will be permanently deleted from your gallery and
            Cloudinary. This action cannot be undone.
          </p>
          <div className="mt-6 overflow-hidden rounded-2xl border border-gold/20">
            <img
              src={imageToDelete.image}
              alt="Image to delete"
              className="w-full h-44 object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-3 mt-7">
            <button
              onClick={() => setImageToDelete(null)}
              disabled={Boolean(deletingId)}
              className="py-3 rounded-full border border-gold/30 text-charcoal font-semibold hover:bg-gold/10 transition disabled:opacity-50">
              Cancel
            </button>

            <button
              onClick={deleteImage}
              disabled={Boolean(deletingId)}
              className="py-3 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 shadow-lg shadow-red-500/20 transition disabled:opacity-70 flex items-center justify-center gap-2">
              {deletingId ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 size={17} />
                  Delete Image
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteImageModal;
