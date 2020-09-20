import React, { Component, Fragment } from "react";
import "./Campaign.css";

// Helpers
const formatCurrency = (val) => {
  const amount = (Math.round(val)).toString();
  if (amount.length > 3 && val > 0) {
    return [amount.slice(0, 1), ",", amount.slice(-3)].join("");
  }
  return val;
};

// Campaign component
class Campaign extends Component {
  state = {
    donation: null,
    donations: 0,
    donors: 0,
    error: null,
  };

  handleDonation = (event) => {
    this.setState({
      donation: Number(event.target.value),
      error: null,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { donation } = this.state;
    if (donation <= 5) {
      this.setState({ error: "Donations must be at least $5." });
      return;
    }

    this.setState((prevState) => ({
      donation: null,
      donations: prevState.donations + prevState.donation,
      donors: prevState.donors + 1,
    }));

    event.target.reset();
  };

  render() {
    const { donation, donations, donors, error } = this.state;
    const amountLeft = formatCurrency(5000 - donations);

    const fullyFunded = donations >= 5000;
    const progress = (donations / 5000) * 100;
    const progressBarBorderRadius = fullyFunded ? "5px 5px 0 0" : "5px 0 0 0";

    return (
      <main className="campaign">
        <section className="progress-banner-container">
          <div className="progress-banner">
            {!fullyFunded ? (
              <Fragment>
                <strong>
                  <sup>$</sup>
                  {amountLeft}
                </strong>{" "}
                still needed to fund this project
              </Fragment>
            ) : (
              <div>Campaign is fully funded!</div>
            )}
          </div>
          <div className="arrow-down" />
        </section>

        <section className="card">
          <div className="progress-container">
            <div
              className="progress-bar"
              style={{
                borderRadius: progressBarBorderRadius,
                width: `${progress >= 100 ? 100 : progress}%`,
              }}
            />
            <div className="progress-bar-background" />
          </div>

          <h2>Only four days left to fund this project</h2>

          <div className="donors">
            Join the <span className="donor-count">{donors}</span> other donors
            who have already supported this project.
          </div>

          {error && <div className="error">{error}</div>}
          <form onSubmit={this.handleSubmit}>
            <div className="input-container">
              <div className="dollar-sign">$</div>
              <input type="number" onChange={this.handleDonation} step="any" />
            </div>
            <button disabled={!donation} type="submit">
              <h3 className="donation-button-text">Give Now</h3>
            </button>
            {/* <fieldset>
            <legend>Donation</legend>
            <p>
              <input name="firstName" />
            </p>
          </fieldset> */}
          </form>
        </section>
      </main>
    );
  }
}

export default Campaign;
