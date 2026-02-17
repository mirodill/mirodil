import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  Heart, 
  ThumbsDown, 
  Bookmark, 
  Share2, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Link2, 
  Send 
} from "lucide-react";
import { handleVote, handleSave, initializePost } from "@/features/posts/postInteractionSlice";
import { toast } from "sonner";

export default function ShareSidebar({ post }) {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useDispatch();

  const postState = useSelector((state) => state.interaction.posts[post?.id]);

  useEffect(() => {
    if (post?.id) dispatch(initializePost(post));
  }, [post?.id, dispatch]);

  useEffect(() => {
    const close = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setShowShareMenu(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  if (!post) return null;

  const likes = postState ? postState.likes : (post.likes_count || 0);
  const dislikes = postState ? postState.dislikes : (post.dislikes_count || 0);
  const userReaction = postState ? postState.userReaction : (post.user_reaction || null);
  const isSaved = postState ? postState.isSaved : (post.is_saved || false);

  const onAction = (fn, ...args) => {
    if (!localStorage.getItem("token")) return toast.error("Tizimga kiring!");
    dispatch(fn(...args));
  };

  // LINKNI NUSXALASH VA YO'NALTIRISH FUNKSIYASI
  const handleShareAndCopy = (platformUrl) => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success("Havola nusxalandi va ulashish oynasi ochildi!");
    
    if (platformUrl) {
      window.open(platformUrl, "_blank", "noreferrer");
    }
    setShowShareMenu(false);
  };

  const formatNumber = (num) => num >= 1000 ? (num / 1000).toFixed(1) + 'k' : num;
  const currentUrl = encodeURIComponent(window.location.href);

  return (
    <div className="flex items-center justify-between mb-8 p-4 rounded-xl z-40 border">
      <div className="flex items-center gap-3">
        <button
          onClick={() => onAction(handleVote, { postId: post.id, type: 'like' })}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all shadow-sm ${
            userReaction === 'like' ? 'bg-red-100 text-red-600' : 'bg-white text-gray-700 hover:bg-red-50'
          }`}
        >
          <Heart className={`w-5 h-5 ${userReaction === 'like' ? 'fill-current' : ''}`} />
          <span className="font-semibold">{formatNumber(likes)}</span>
        </button>

        <button
          onClick={() => onAction(handleVote, { postId: post.id, type: 'dislike' })}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all shadow-sm ${
            userReaction === 'dislike' ? 'bg-gray-800 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          <ThumbsDown className={`w-5 h-5 ${userReaction === 'dislike' ? 'fill-current' : ''}`} />
          <span className="font-semibold">{formatNumber(dislikes)}</span>
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            onAction(handleSave, post.id);
            toast.success(!isSaved ? "Saqlandi" : "O'chirildi");
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all shadow-sm ${
            isSaved ? 'bg-amber-100 text-amber-700' : 'bg-white text-gray-700 hover:bg-amber-50'
          }`}
        >
          <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
          <span className="font-semibold hidden sm:inline">{isSaved ? 'Saqlandi' : 'Saqlash'}</span>
        </button>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowShareMenu(!showShareMenu)}
            className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-all shadow-sm ${
              showShareMenu ? 'bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            <Share2 className="w-5 h-5" />
            <span className="font-semibold hidden sm:inline">Ulashish</span>
          </button>

          {showShareMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
              <button
                onClick={() => handleShareAndCopy(`https://t.me/share/url?url=${currentUrl}`)}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 text-gray-700 transition-colors"
              >
                <Send className="w-5 h-5 text-sky-500" />
                <span className="text-sm font-medium">Telegram</span>
              </button>
              
              <button
                onClick={() => handleShareAndCopy(`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`)}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 text-gray-700 transition-colors"
              >
                <Facebook className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium">Facebook</span>
              </button>

              <button
                onClick={() => handleShareAndCopy(`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`)}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 text-gray-700 transition-colors"
              >
                <Linkedin className="w-5 h-5 text-blue-700" />
                <span className="text-sm font-medium">LinkedIn</span>
              </button>

              <div className="h-px bg-gray-100 my-1 mx-2" />

              <button
                onClick={() => handleShareAndCopy(null)}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-gray-700 transition-colors"
              >
                <Link2 className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium">Faqat linkni nusxalash</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}