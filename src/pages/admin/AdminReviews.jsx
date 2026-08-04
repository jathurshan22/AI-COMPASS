import { useState } from "react";
import { StarRating } from "../../components/Cards.jsx";
import Avatar from "../../components/Avatar.jsx";
import Icon from "../../components/Icon.jsx";
import Modal from "../../components/Modal.jsx";
import { adminReviews } from "../../data/adminData.js";

export default function AdminReviews() {
  const [list, setList] = useState(() => adminReviews.map((r, i) => ({ ...r, id: i })));
  const [remove, setRemove] = useState(null);
  const pending = list.filter((r) => r.status === "pending").length;

  const approve = (id) => setList((l) => l.map((r) => (r.id === id ? { ...r, status: "published" } : r)));
  const confirmDelete = () => { setList((l) => l.filter((r) => r.id !== remove.id)); setRemove(null); };

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div><h1>Reviews</h1><p className="muted">{list.length} reviews · {pending} awaiting approval.</p></div>
      </div>

      {list.length ? (
        <div className="admin-reviews">
          {list.map((r) => (
            <div key={r.id} className="admin-review">
              <div className="admin-review-top">
                <span className="admin-review-user">
                  <Avatar name={r.user} size={34} />
                  <span className="admin-review-id">
                    <strong>{r.user}</strong>
                    <span className="muted">on {r.tool} · {r.at}</span>
                  </span>
                </span>
                <span className={`admin-review-status ${r.status}`}>{r.status}</span>
              </div>
              <div className="admin-review-stars"><StarRating value={r.rating} size={15} /></div>
              <p className="admin-review-text">{r.text}</p>
              <div className="admin-review-actions">
                {r.status === "pending" && (
                  <button className="admin-approve" onClick={() => approve(r.id)}><Icon name="check" size={15} />Approve</button>
                )}
                <button className="admin-del danger" onClick={() => setRemove(r)}><Icon name="trash" size={15} />Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="admin-card" style={{ textAlign: "center", padding: 44, color: "var(--muted)" }}>
          <Icon name="star" size={28} /><p style={{ marginTop: 10 }}>No reviews left to moderate.</p>
        </div>
      )}

      {remove && (
        <Modal
          size="sm"
          title="Delete review"
          onClose={() => setRemove(null)}
          footer={<>
            <button className="btn btn-ghost btn-sm" onClick={() => setRemove(null)}>Cancel</button>
            <button className="btn btn-sm admin-danger-btn" onClick={confirmDelete}><Icon name="trash" size={16} />Delete</button>
          </>}
        >
          <p>Delete <strong>{remove.user}</strong>'s review of <strong>{remove.tool}</strong>?</p>
        </Modal>
      )}
    </div>
  );
}
