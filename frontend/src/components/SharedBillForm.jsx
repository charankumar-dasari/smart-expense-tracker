import { useEffect, useState } from "react";

import { getMembers } from "../services/memberService";

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

    const { name, value } =
      e.target;

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

      alert(
        "Please enter a valid amount"
      );

      return;

    }

    if (!formData.paidByMemberId) {

      alert(
        "Please select who paid"
      );

      return;

    }

    if (
      formData.participantIds.length === 0
    ) {

      alert(
        "Select at least one participant"
      );

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
        Number(
          formData.paidByMemberId
        ),

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

    <div className="card">

      <h2>

        {selectedBill
          ? "✏️ Edit Shared Bill"
          : "🧾 Create Shared Bill"}

      </h2>


      {members.length === 0 ? (

        <p>
          Please add members first.
        </p>

      ) : (

        <form onSubmit={handleSubmit}>


          <input
            type="text"
            name="title"
            placeholder="Bill title"
            value={formData.title}
            onChange={handleChange}
            required
          />


          <input
            type="number"
            name="amount"
            placeholder="Bill amount"
            value={formData.amount}
            onChange={handleChange}
            min="0.01"
            step="0.01"
            required
          />


          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />


          <h3>
            Who Paid?
          </h3>


          <select
            name="paidByMemberId"
            value={
              formData.paidByMemberId
            }
            onChange={handleChange}
          >

            <option value="">
              Select Member
            </option>

            {members.map(
              (member) => (

                <option
                  key={member.id}
                  value={member.id}
                >

                  {member.name}

                </option>

              )
            )}

          </select>


          <h3>
            Select Participants
          </h3>


          <div className="participant-list">

            {members.map(
              (member) => (

                <label
                  key={member.id}
                  className="participant-item"
                >

                  <input
                    type="checkbox"

                    checked={
                      formData.participantIds.includes(
                        member.id
                      )
                    }

                    onChange={() =>
                      handleParticipantChange(
                        member.id
                      )
                    }
                  />

                  {member.name}

                </label>

              )
            )}

          </div>


          <button
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
              type="button"
              onClick={handleCancelEdit}
            >

              Cancel Edit

            </button>

          )}

        </form>

      )}

    </div>

  );

}

export default SharedBillForm;