import React, { useState, useEffect } from 'react';
import MainLayout from '../components/MainLayout';
import api from '../api'; // Ensure to import your API configuration

function Notification() {
  const [unreadNotifications, setUnreadNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getUnreadNotifications = (page) => {
    api.get(`/api/notifications/?page=${page}`)
      .then((res) => res.data)
      .then((data) => {
        setUnreadNotifications(data.results); // Adjust according to your backend response structure
        setTotalPages(Math.ceil(data.count / 10)); // Adjust according to your PAGE_SIZE
      })
      .catch((err) => console.log(err));
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  }

  useEffect(() => {
    getUnreadNotifications(currentPage);
  }, [currentPage]);

  const markAsRead = (notificationId) => {
    api.post(`/api/notifications/${notificationId}/mark_as_read/`)
      .then(() => {
        // Remove the notification from the unread list after marking it as read
        setUnreadNotifications(unreadNotifications.filter(n => n.id !== notificationId));
      })
      .catch((err) => console.log(err));
  }

  const markAllAsRead = () => {
    api.post(`/api/notifications/mark_all_as_read/`)
      .then(() => {
        // Clear all unread notifications from the list
        setUnreadNotifications([]);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <MainLayout>
        <h1 className="text-center mt-4">Notifications</h1>
        <div className="row justify-content-center">
          <div className="col-12 col-md-8">
            <div className="card">
              <div className="card-header bg-white justify-content-between d-flex align-items-center">
                <h4 className="card-title mb-0">Unread Notifications</h4>
                <button className="btn btn-primary btn-sm" onClick={markAllAsRead}>Read All</button>
              </div>
              <div className="card-body">
                <ul className="list-group">
                  {unreadNotifications.map(notification => (
                    <li key={notification.id} className="list-group-item d-flex justify-content-between align-items-center">
                      {notification.message}
                      <button className="btn btn-outline-primary btn-sm" onClick={() => markAsRead(notification.id)}>Mark Read</button>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 text-center">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      className={`btn btn-sm ${currentPage === i + 1 ? 'btn-primary' : 'btn-secondary'} me-1`}
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </div>
  )
}

export default Notification;
