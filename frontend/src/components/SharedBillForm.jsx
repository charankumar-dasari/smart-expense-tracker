import { useEffect, useState } from "react";

import {
  getMembers
} from "../services/memberService";

import {
  createSharedBill,
  updateSharedBill
} from "../services/sharedBillService";

const initialForm = {
  title: "",
  amount: "",
  date: new Date().toISOString().split("T")[0],
  paidByMemberId: "",
  participantIds: []
};

function SharedBillForm({
  selectedBill,
  onSuccess,
  clearSelection
}) {

  const [members, setMembers] = useState([]);

  const [formData, setFormData] =
    useState(initialForm);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    loadMembers();

  }, []);

  useEffect(() => {

    if (selectedBill) {

      setFormData({
        title: selectedBill.title || "",
        amount: selectedBill.amount || "",
        date:
          selectedBill.date ||
          new Date().toISOString().split("T")[0],

        paidByMemberId:
          selectedBill.paidBy?.id || "",

        participantIds:
          selectedBill.participants?.map(
            (member) => member.id
          ) || []
      });

    } else {

      setFormData(initialForm);

    }

  }, [selectedBill]);

  const loadMembers = async () => {

    try {

      const response =
        await getMembers();

      setMembers(response.data);

    } catch (error) {

      console.error(error);

    }

  };

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));

  };

  const handleParticipantChange =
    (memberId) => {

      setFormData((previous) => {

        if (
          previous.participantIds.includes(
            memberId
          )
        ) {

          return {
            ...previous,

            participantIds:
              previous.participantIds.filter(
                (id) => id !== memberId
              )
          };

        }

        return {

          ...previous,

          participantIds: [
            ...previous.participantIds,
            memberId
          ]

        };

      });

    };

  const getInitial = (name) => {

    return name
      ? name.charAt(0).toUpperCase()
      : "?";

  };

  const amountPerPerson =
    formData.participantIds.length > 0 &&
    Number(formData.amount) > 0

      ? Number(formData.amount) /
        formData.participantIds.length

      : 0;

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!formData.title.trim()) {

      alert("Please enter bill title");

      return;

    }

    if (
      !formData.amount ||
      Number(formData.amount) <= 0
    ) {

      alert("Please enter a valid amount");

      return;

    }

    if (!formData.paidByMemberId) {

      alert("Please select who paid");

      return;

    }

    if (
      formData.participantIds.length === 0
    ) {

      alert("Select at least one participant");

      return;

    }

    const billData = {

      title:
        formData.title.trim(),

      amount:
        Number(formData.amount),

      date:
        formData.date,

      paidByMemberId:
        Number(formData.paidByMemberId),

      participantIds:
        formData.participantIds

    };

    try {

      setLoading(true);

      if (selectedBill) {

        await updateSharedBill(
          selectedBill.id,
          billData
        );

        alert(
          "Shared bill updated successfully!"
        );

      } else {

        await createSharedBill(
          billData
        );

        alert(
          "Shared bill created successfully!"
        );

      }

      setFormData(initialForm);

      clearSelection();

      onSuccess();

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to save shared bill"
      );

    } finally {

      setLoading(false);

    }

  };

  const handleCancelEdit = () => {

    setFormData(initialForm);

    clearSelection();

  };

  return (

    <div className="card shared-bill-card">

      <div className="section-header">

        <div>

          <span className="section-label">
            BILL MANAGEMENT
          </span>

          <h2>
            {selectedBill
              ? "Edit Shared Bill"
              : "Create Shared Bill"}
          </h2>

          <p>
            Split expenses fairly between your members.
          </p>

        </div>

      </div>

      {members.length === 0 ? (

        <div className="premium-empty-state">

          <div className="empty-icon">
            👥
          </div>

          <h3>
            No members available
          </h3>

          <p>
            Add members before creating
            a shared bill.
          </p>

        </div>

      ) : (

        <form
          className="shared-bill-form"
          onSubmit={handleSubmit}
        >

          <div className="shared-section">

            <h3>
              Bill Details
            </h3>

            <div className="form-grid three-columns">

              <div className="form-group">

                <label>
                  Bill Title
                </label>

                <input
                  type="text"
                  name="title"
                  placeholder="Example: Dinner"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="form-group">

                <label>
                  Total Amount
                </label>

                <input
                  type="number"
                  name="amount"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={handleChange}
                  min="0.01"
                  step="0.01"
                  required
                />

              </div>

              <div className="form-group">

                <label>
                  Bill Date
                </label>

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

          </div>

          <div className="shared-section">

            <h3>
              Who Paid?
            </h3>

            <select
              className="payer-select"
              name="paidByMemberId"
              value={formData.paidByMemberId}
              onChange={handleChange}
            >

              <option value="">
                Select the person who paid
              </option>

              {members.map((member) => (

                <option
                  key={member.id}
                  value={member.id}
                >

                  {member.name}

                </option>

              ))}

            </select>

          </div>

          <div className="shared-section">

            <div className="participant-heading">

              <div>

                <h3>
                  Select Participants
                </h3>

                <p>
                  Choose everyone included in this bill.
                </p>

              </div>

              <span className="participant-count">

                {formData.participantIds.length}
                {" "}selected

              </span>

            </div>

            <div className="participant-card-grid">

              {members.map((member) => {

                const selected =
                  formData.participantIds.includes(
                    member.id
                  );

                return (

                  <button
                    type="button"
                    key={member.id}
                    className={
                      `participant-card ${
                        selected
                          ? "selected"
                          : ""
                      }`
                    }
                    onClick={() =>
                      handleParticipantChange(
                        member.id
                      )
                    }
                  >

                    <span className="participant-avatar">

                      {getInitial(member.name)}

                    </span>

                    <span className="participant-name">

                      {member.name}

                    </span>

                    <span className="participant-check">

                      {selected ? "✓" : "+"}

                    </span>

                  </button>

                );

              })}

            </div>

          </div>

          <div className="split-preview">

            <div className="split-preview-header">

              <h3>
                Split Preview
              </h3>

              <span>
                Live calculation
              </span>

            </div>

            <div className="split-preview-grid">

              <div>

                <span>
                  Total Bill
                </span>

                <strong>

                  ₹
                  {Number(
                    formData.amount || 0
                  ).toFixed(2)}

                </strong>

              </div>

              <div>

                <span>
                  Participants
                </span>

                <strong>

                  {formData.participantIds.length}

                </strong>

              </div>

              <div className="split-highlight">

                <span>
                  Each Person Pays
                </span>

                <strong>

                  ₹
                  {amountPerPerson.toFixed(2)}

                </strong>

              </div>

            </div>

          </div>

          <div className="form-actions">

            <button
              className="primary-button"
              type="submit"
              disabled={loading}
            >

              {loading
                ? "Saving..."
                : selectedBill
                ? "Update Shared Bill"
                : "Create Shared Bill"}

            </button>

            {selectedBill && (

              <button
                className="secondary-button"
                type="button"
                onClick={handleCancelEdit}
              >

                Cancel

              </button>

            )}

          </div>

        </form>

      )}

    </div>

  );

}

export default SharedBillForm;