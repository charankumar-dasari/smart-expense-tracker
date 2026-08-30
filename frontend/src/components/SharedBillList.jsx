
import { useEffect, useState } from "react";

import {
  getSharedBills,
  getBillSplit,
  getSettlements,
  deleteSharedBill
} from "../services/sharedBillService";


function SharedBillList({
  refreshKey,
  onEdit
}) {

  /* =========================
     STATES
  ========================= */

  const [bills, setBills] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedSplit, setSelectedSplit] =
    useState(null);

  const [
    selectedSettlements,
    setSelectedSettlements
  ] = useState([]);

  const [
    selectedBillId,
    setSelectedBillId
  ] = useState(null);


  /* =========================
     LOAD SHARED BILLS
  ========================= */

  const loadBills = async () => {

    try {

      setLoading(true);

      const response =
        await getSharedBills();

      setBills(response.data);

    } catch (error) {

      console.error(error);

      alert(
        "Failed to load shared bills"
      );

    } finally {

      setLoading(false);

    }

  };


  /* =========================
     AUTO REFRESH
  ========================= */

  useEffect(() => {

    loadBills();

  }, [refreshKey]);


  /* =========================
     VIEW SPLIT DETAILS
  ========================= */

  const handleViewSplit =
    async (id) => {

      try {

        const response =
          await getBillSplit(id);

        setSelectedSplit(
          response.data
        );

        setSelectedSettlements([]);

        setSelectedBillId(id);

      } catch (error) {

        console.error(error);

        alert(
          "Failed to load split details"
        );

      }

    };


  /* =========================
     VIEW SETTLEMENTS
  ========================= */

  const handleViewSettlements =
    async (id) => {

      try {

        const response =
          await getSettlements(id);

        setSelectedSettlements(
          response.data
        );

        setSelectedSplit(null);

        setSelectedBillId(id);

      } catch (error) {

        console.error(error);

        alert(
          "Failed to load settlement details"
        );

      }

    };


  /* =========================
     DELETE SHARED BILL
  ========================= */

  const handleDelete =
    async (id) => {

      const confirmed =
        window.confirm(
          "Are you sure you want to delete this shared bill?"
        );

      if (!confirmed) {

        return;

      }

      try {

        await deleteSharedBill(id);

        await loadBills();


        /* Clear selected details
           if deleted bill was selected */

        if (
          selectedBillId === id
        ) {

          setSelectedSplit(null);

          setSelectedSettlements([]);

          setSelectedBillId(null);

        }


        alert(
          "Shared bill deleted successfully!"
        );

      } catch (error) {

        console.error(error);

        alert(
          "Failed to delete shared bill"
        );

      }

    };


  /* =========================
     LOADING UI
  ========================= */

  if (loading) {

    return (

      <div className="card">

        <h2>
          🧾 Shared Bills
        </h2>

        <p>
          Loading shared bills...
        </p>

      </div>

    );

  }


  return (

    <div className="card">


      {/* =========================
          SHARED BILL LIST
      ========================= */}

      <h2>
        🧾 Shared Bills
      </h2>


      {bills.length === 0 ? (

        <p>
          No shared bills created yet.
        </p>

      ) : (

        <div className="shared-bill-list">


          {bills.map((bill) => (

            <div
              className="shared-bill-item"
              key={bill.id}
            >


              {/* =========================
                  BILL DETAILS
              ========================= */}

              <div className="bill-header">

                <h3>
                  {bill.title}
                </h3>


                <p>

                  <strong>
                    Amount:
                  </strong>

                  {" ₹"}

                  {Number(
                    bill.amount
                  ).toFixed(2)}

                </p>


                <p>

                  <strong>
                    Date:
                  </strong>

                  {" "}

                  {bill.date}

                </p>


                <p>

                  <strong>
                    Paid By:
                  </strong>

                  {" "}

                  {bill.paidBy?.name}

                </p>


                <p>

                  <strong>
                    Participants:
                  </strong>

                  {" "}

                  {bill.participants
                    ?.map(
                      (member) =>
                        member.name
                    )
                    .join(", ")}

                </p>

              </div>


              {/* =========================
                  BILL ACTIONS
              ========================= */}

              <div className="bill-actions">


                {/* EDIT BUTTON */}

                <button
                  onClick={() =>
                    onEdit(bill)
                  }
                >

                  ✏️ Edit

                </button>


                {/* VIEW SPLIT */}

                <button
                  onClick={() =>
                    handleViewSplit(
                      bill.id
                    )
                  }
                >

                  📊 View Split

                </button>


                {/* VIEW SETTLEMENTS */}

                <button
                  onClick={() =>
                    handleViewSettlements(
                      bill.id
                    )
                  }
                >

                  💸 Who Owes Whom

                </button>


                {/* DELETE */}

                <button
                  onClick={() =>
                    handleDelete(
                      bill.id
                    )
                  }
                >

                  🗑️ Delete

                </button>


              </div>


            </div>

          ))}


        </div>

      )}


      {/* =========================
          SPLIT RESULT
      ========================= */}

      {selectedSplit && (

        <div className="split-result">

          <h2>
            📊 Split Details
          </h2>


          <h3>
            {selectedSplit.billTitle}
          </h3>


          <p>

            <strong>
              Total Amount:
            </strong>

            {" ₹"}

            {Number(
              selectedSplit.totalAmount
            ).toFixed(2)}

          </p>


          <p>

            <strong>
              Participants:
            </strong>

            {" "}

            {selectedSplit.participantCount}

          </p>


          <p>

            <strong>
              Per Person:
            </strong>

            {" ₹"}

            {Number(
              selectedSplit.amountPerPerson
            ).toFixed(2)}

          </p>


          <p>

            <strong>
              Paid By:
            </strong>

            {" "}

            {selectedSplit.paidBy}

          </p>


          {/* =========================
              PARTICIPANT SPLIT
          ========================= */}

          <div className="split-participants">


            {selectedSplit.participants?.map(
              (participant) => (

                <div
                  key={
                    participant.memberId
                  }

                  className="
                    split-participant
                  "
                >


                  <h4>

                    {
                      participant.memberName
                    }

                  </h4>


                  <p>

                    Share:

                    {" ₹"}

                    {Number(
                      participant.shareAmount
                    ).toFixed(2)}

                  </p>


                  <p>

                    Paid:

                    {" ₹"}

                    {Number(
                      participant.paidAmount
                    ).toFixed(2)}

                  </p>


                  {/* =========================
                      BALANCE STATUS
                  ========================= */}

                  {Number(
                    participant.amountOwed
                  ) < 0 ? (

                    <p
                      className="
                        receive-amount
                      "
                    >

                      Should Receive:

                      {" ₹"}

                      {Math.abs(
                        Number(
                          participant.amountOwed
                        )
                      ).toFixed(2)}

                    </p>

                  ) : Number(
                    participant.amountOwed
                  ) > 0 ? (

                    <p
                      className="
                        owe-amount
                      "
                    >

                      Owes:

                      {" ₹"}

                      {Number(
                        participant.amountOwed
                      ).toFixed(2)}

                    </p>

                  ) : (

                    <p
                      className="
                        settled-amount
                      "
                    >

                      ✓ Settled

                    </p>

                  )}


                </div>

              )
            )}


          </div>

        </div>

      )}


      {/* =========================
          SETTLEMENT RESULT
      ========================= */}

      {selectedSettlements.length > 0 && (

        <div className="settlement-result">


          <h2>
            💸 Who Owes Whom
          </h2>


          {selectedSettlements.map(
            (
              settlement,
              index
            ) => (

              <div
                className="
                  settlement-item
                "

                key={index}
              >

                <strong>

                  {
                    settlement.fromMember
                  }

                </strong>


                {" owes ₹"}


                <strong>

                  {Number(
                    settlement.amount
                  ).toFixed(2)}

                </strong>


                {" to "}


                <strong>

                  {
                    settlement.toMember
                  }

                </strong>


              </div>

            )
          )}


        </div>

      )}


    </div>

  );

}


export default SharedBillList;

