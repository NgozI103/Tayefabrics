import useAccountDetailsBehavior from "../hooks/useAccountDetailsBehavior";
import useWhatsAppWidget from "../hooks/useWhatsAppWidget";

export default function ProfileDetailsPage() {
  useAccountDetailsBehavior();
  useWhatsAppWidget();
  return (
    <>
      <main className="profile-details-page">
            <div className="profile-success-banner" id="profile-success-banner" role="status" aria-live="polite">
              <i className="bx bx-check-circle"></i>
              <span id="profile-success-message"></span>
              <button type="button" id="profile-success-close" aria-label="Dismiss message">
                <i className="bx bx-x"></i>
              </button>
            </div>
      
            <section className="profile-details-header">
              <div className="container">
                <button type="button" className="profile-details-back" aria-label="Go back" onClick={() => window.history.back()}>
                  <i className="bx bx-chevron-left"></i>
                </button>
                <h1>Account Details</h1>
              </div>
            </section>
      
            <section className="profile-details-content">
              <div className="container">
                <div className="profile-identity">
                  <img src="../Images/image 18.png" alt="Profile avatar" className="profile-identity-avatar" />
                  <h3 id="profile-display-name">Ngozi Ukah</h3>
                </div>
      
                <div className="profile-field-list">
                  <article className="profile-field-item" data-key="firstName" data-label="First name">
                    <p>FIRST NAME</p>
                    <div className="profile-field-row profile-display-row">
                      <span className="profile-field-value" id="profile-firstName">Ngozi</span>
                      <button type="button" className="profile-edit-btn" aria-label="Edit first name">
                        <i className="bx bx-edit-alt"></i>
                      </button>
                    </div>
                    <div className="profile-edit-area"></div>
                  </article>
      
                  <article className="profile-field-item" data-key="lastName" data-label="Last name">
                    <p>LAST NAME</p>
                    <div className="profile-field-row profile-display-row">
                      <span className="profile-field-value" id="profile-lastName">Ukah</span>
                      <button type="button" className="profile-edit-btn" aria-label="Edit last name">
                        <i className="bx bx-edit-alt"></i>
                      </button>
                    </div>
                    <div className="profile-edit-area"></div>
                  </article>
      
                  <article className="profile-field-item" data-key="mobile" data-label="Mobile number">
                    <p>MOBILE NUMBER</p>
                    <div className="profile-field-row profile-display-row">
                      <span className="profile-field-value profile-underlined" id="profile-mobile">+2349136664497</span>
                      <div className="profile-row-actions">
                        <span className="profile-verified" id="profile-mobile-verified">Verified</span>
                        <button type="button" className="profile-edit-btn" aria-label="Edit mobile number">
                          <i className="bx bx-edit-alt"></i>
                        </button>
                      </div>
                    </div>
                    <div className="profile-edit-area"></div>
                  </article>
      
                  <article className="profile-field-item" data-key="email" data-label="Email">
                    <p>EMAIL</p>
                    <div className="profile-field-row profile-display-row">
                      <span className="profile-field-value profile-underlined" id="profile-email">ngozivicah@gmail.com</span>
                      <div className="profile-row-actions">
                        <span className="profile-verified" id="profile-email-verified">Verified</span>
                        <button type="button" className="profile-edit-btn" aria-label="Edit email">
                          <i className="bx bx-edit-alt"></i>
                        </button>
                      </div>
                    </div>
                    <div className="profile-edit-area"></div>
                  </article>
      
                  <article className="profile-field-item" data-key="address" data-label="Address">
                    <p>ADDRESS</p>
                    <div className="profile-field-row profile-display-row">
                      <span className="profile-field-value" id="profile-address">Lekki, Lagos, Nigeria</span>
                      <button type="button" className="profile-edit-btn" aria-label="Edit address">
                        <i className="bx bx-edit-alt"></i>
                      </button>
                    </div>
                    <div className="profile-edit-area"></div>
                  </article>
      
                  <article className="profile-field-item" data-key="passcode" data-label="Passcode">
                    <p>PASSCODE</p>
                    <div className="profile-field-row profile-display-row">
                      <span className="profile-field-value" id="profile-passcode">••••••</span>
                      <button type="button" className="profile-edit-btn" aria-label="Edit passcode">
                        <i className="bx bx-edit-alt"></i>
                      </button>
                    </div>
                    <div className="profile-edit-area"></div>
                  </article>
                </div>
              </div>
            </section>
          </main>
    </>
  );
}
