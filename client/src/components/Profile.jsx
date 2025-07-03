
import React, { useState } from 'react';
import '../css/profile.css';
const Profile = () => {
    const [profileImage, setProfileImage] = useState('https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/148d1eee-5f88-4adb-b0e1-51f217c70690.png');
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImage(e.target.result);
                // Here you would typically send the image to your server
                // Example: uploadProfilePicture(file);
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow profile-card">
                        <div className="card-body p-5">
                           
                            <div className="profile-picture-container position-relative mb-3">
                                <img id="profileImage" src={profileImage} alt="User  profile" className="rounded-circle" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
                                <button type="button" className="btn btn-sm btn-dark position-absolute " onClick={() => document.getElementById('imageInput').click()}>
                                    <i className="bi bi-camera-fill"></i>
                                </button>
                                <input type="file" id="imageInput" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
                            </div>
                            <h2>My Profile</h2>
                            <form id="profileForm">
                                <div className="mb-3">
                                    <label className="form-label">Username</label>
                                    <input type="text" className="form-control" defaultValue="JohnDoe" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-control" defaultValue="john@example.com" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Address</label>
                                    <textarea className="form-control" rows="2" defaultValue="123 Main St, City"></textarea>
                                </div>
                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button type="button" className="btn btn-primary me-md-2">Save Changes</button>
                                    <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#passwordModal">
                                        Change Password
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* Password Change Modal */}
            <div className="modal fade" id="passwordModal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content"></div>
                        <div className="modal-header">
                            <h5 className="modal-title">Change Password</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Current Password</label>
                                    <input type="password" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">New Password</label>
                                    <input type="password" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Confirm New Password</label>
                                    <input type="password" className="form-control" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Update Password</button>
                        </div>
                    </div>
                </div>
            </div>
        
    );
};
export default Profile;