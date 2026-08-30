import { useEffect, useState } from "react";

import {
  createMember,
  deleteMember,
  getMembers
} from "../services/memberService";

function MemberManager() {

  const [members, setMembers] =
    useState([]);

  const [name, setName] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const loadMembers = async () => {

    try {

      const response =
        await getMembers();

      setMembers(response.data);

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    loadMembers();

  }, []);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!name.trim()) {

      alert("Please enter member name");

      return;

    }

    try {

      setLoading(true);

      await createMember({
        name: name.trim()
      });

      setName("");

      await loadMembers();

      alert("Member added successfully!");

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to add member"
      );

    } finally {

      setLoading(false);

    }

  };

  const handleDelete = async (
    id,
    memberName
  ) => {

    const confirmed = window.confirm(
      `Remove ${memberName} from members?`
    );

    if (!confirmed) return;

    try {

      await deleteMember(id);

      await loadMembers();

      alert("Member removed successfully!");

    } catch (error) {

      console.error(error);

      alert("Failed to delete member");

    }

  };

  const getInitial = (memberName) => {

    return memberName
      ? memberName.charAt(0).toUpperCase()
      : "?";

  };

  return (

    <div className="member-manager">

      <div className="member-page-header">

        <div>

          <span className="section-label">
            PEOPLE MANAGEMENT
          </span>

          <h2>
            Members
          </h2>

          <p>
            Manage people involved in your
            shared expenses.
          </p>

        </div>

        <div className="member-total-card">

          <span>
            Total Members
          </span>

          <strong>
            {members.length}
          </strong>

        </div>

      </div>

      <div className="card add-member-card">

        <div>

          <h3>
            Add New Member
          </h3>

          <p>
            Add someone to participate
            in shared expenses.
          </p>

        </div>

        <form
          className="member-form"
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            placeholder="Enter member name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <button
            className="primary-button"
            type="submit"
            disabled={loading}
          >

            {loading
              ? "Adding..."
              : "+ Add Member"}

          </button>

        </form>

      </div>

      <div className="members-section">

        <div className="expense-list-header">

          <div>

            <span className="section-label">
              YOUR PEOPLE
            </span>

            <h2>
              Member Directory
            </h2>

          </div>

        </div>

        {members.length === 0 ? (

          <div className="premium-empty-state">

            <div className="empty-icon">
              👥
            </div>

            <h3>
              No members added yet
            </h3>

            <p>
              Add your first member to start
              managing shared expenses.
            </p>

          </div>

        ) : (

          <div className="member-grid">

            {members.map((member) => (

              <div
                className="member-card"
                key={member.id}
              >

                <div className="member-avatar">

                  {getInitial(member.name)}

                </div>

                <div className="member-info">

                  <h3>
                    {member.name}
                  </h3>

                  <p>
                    Shared Expense Member
                  </p>

                </div>

                <button
                  className="remove-member-btn"
                  onClick={() =>
                    handleDelete(
                      member.id,
                      member.name
                    )
                  }
                >

                  🗑 Remove

                </button>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

}

export default MemberManager;