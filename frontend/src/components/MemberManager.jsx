import { useEffect, useState } from "react";

import {
  createMember,
  deleteMember,
  getMembers
} from "../services/memberService";

function MemberManager() {

  const [members, setMembers] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const loadMembers = async () => {

    try {

      const response = await getMembers();

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

  const handleDelete = async (id) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this member?"
    );

    if (!confirmed) {

      return;

    }

    try {

      await deleteMember(id);

      await loadMembers();

    } catch (error) {

      console.error(error);

      alert("Failed to delete member");

    }

  };

  return (

    <div className="card">

      <h2>👥 Members</h2>

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
          type="submit"
          disabled={loading}
        >

          {loading
            ? "Adding..."
            : "Add Member"}

        </button>

      </form>

      {members.length === 0 ? (

        <p>
          No members added yet.
        </p>

      ) : (

        <div className="member-list">

          {members.map((member) => (

            <div
              className="member-item"
              key={member.id}
            >

              <span>
                {member.name}
              </span>

              <button
                onClick={() =>
                  handleDelete(member.id)
                }
              >

                Delete

              </button>

            </div>

          ))}

        </div>

      )}

    </div>

  );
}

export default MemberManager;