package com.expense.expensetracker.service;

import com.expense.expensetracker.dto.BillSplitResponse;
import com.expense.expensetracker.dto.SharedBillRequest;
import com.expense.expensetracker.entity.Member;
import com.expense.expensetracker.entity.SharedBill;
import com.expense.expensetracker.repository.MemberRepository;
import com.expense.expensetracker.repository.SharedBillRepository;
import org.springframework.stereotype.Service;
import com.expense.expensetracker.dto.SettlementResponse;
import java.util.ArrayList;

import java.time.LocalDate;
import java.util.List;

@Service
public class SharedBillService {

    private final SharedBillRepository sharedBillRepository;
    private final MemberRepository memberRepository;

    public SharedBillService(
            SharedBillRepository sharedBillRepository,
            MemberRepository memberRepository
    ) {
        this.sharedBillRepository = sharedBillRepository;
        this.memberRepository = memberRepository;
    }

    public SharedBill createBill(
            SharedBillRequest request
    ) {

        if (request.getTitle() == null
                || request.getTitle().trim().isEmpty()) {

            throw new RuntimeException(
                    "Bill title is required"
            );
        }

        if (request.getAmount() == null
                || request.getAmount() <= 0) {

            throw new RuntimeException(
                    "Bill amount must be greater than zero"
            );
        }

        if (request.getPaidByMemberId() == null) {

            throw new RuntimeException(
                    "Paid by member is required"
            );
        }

        if (request.getParticipantIds() == null
                || request.getParticipantIds().isEmpty()) {

            throw new RuntimeException(
                    "At least one participant is required"
            );
        }

        Member paidBy = memberRepository
                .findById(request.getPaidByMemberId())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Paid by member not found"
                        )
                );

        List<Member> participants =
                memberRepository.findAllById(
                        request.getParticipantIds()
                );

        if (participants.size()
                != request.getParticipantIds().size()) {

            throw new RuntimeException(
                    "One or more participants not found"
            );
        }

        SharedBill bill = new SharedBill();

        bill.setTitle(
                request.getTitle().trim()
        );

        bill.setAmount(
                request.getAmount()
        );

        bill.setDate(
                request.getDate() != null
                        ? request.getDate()
                        : LocalDate.now()
        );

        bill.setPaidBy(paidBy);

        bill.setParticipants(participants);

        return sharedBillRepository.save(bill);
    }

    public List<SharedBill> getAllBills() {

        return sharedBillRepository.findAll();
    }

    public SharedBill getBillById(Long id) {

        return sharedBillRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Bill not found"
                        )
                );
    }

    public void deleteBill(Long id) {

        if (!sharedBillRepository.existsById(id)) {

            throw new RuntimeException(
                    "Bill not found"
            );
        }

        sharedBillRepository.deleteById(id);
    }
    public BillSplitResponse calculateSplit(Long billId) {

    SharedBill bill = sharedBillRepository
            .findById(billId)
            .orElseThrow(() ->
                    new RuntimeException(
                            "Bill not found"
                    )
            );

    int participantCount =
            bill.getParticipants().size();

    if (participantCount == 0) {

        throw new RuntimeException(
                "No participants found for this bill"
        );
    }

    double amountPerPerson =
            bill.getAmount() / participantCount;

    BillSplitResponse response =
            new BillSplitResponse();

    response.setBillId(bill.getId());

    response.setBillTitle(
            bill.getTitle()
    );

    response.setTotalAmount(
            bill.getAmount()
    );

    response.setParticipantCount(
            participantCount
    );

    response.setAmountPerPerson(
            amountPerPerson
    );

    response.setPaidBy(
            bill.getPaidBy().getName()
    );

    for (Member member :
            bill.getParticipants()) {

        BillSplitResponse.ParticipantShare share =
                new BillSplitResponse.ParticipantShare();

        share.setMemberId(
                member.getId()
        );

        share.setMemberName(
                member.getName()
        );

        share.setShareAmount(
                amountPerPerson
        );

        if (member.getId().equals(
                bill.getPaidBy().getId()
        )) {

            share.setPaidAmount(
                    bill.getAmount()
            );

            share.setAmountOwed(
                    amountPerPerson -
                            bill.getAmount()
            );

        } else {

            share.setPaidAmount(0.0);

            share.setAmountOwed(
                    amountPerPerson
            );
        }

        response.getParticipants()
                .add(share);
    }

    return response;
}
public List<SettlementResponse> getSettlements(
        Long billId
) {

    SharedBill bill = sharedBillRepository
            .findById(billId)
            .orElseThrow(() ->
                    new RuntimeException(
                            "Bill not found"
                    )
            );

    int participantCount =
            bill.getParticipants().size();

    if (participantCount == 0) {

        throw new RuntimeException(
                "No participants found"
        );
    }

    double amountPerPerson =
            bill.getAmount() / participantCount;

    List<SettlementResponse> settlements =
            new ArrayList<>();

    for (Member member : bill.getParticipants()) {

        // Person who paid the bill
        if (member.getId().equals(
                bill.getPaidBy().getId()
        )) {
            continue;
        }

        settlements.add(
                new SettlementResponse(
                        member.getName(),
                        bill.getPaidBy().getName(),
                        amountPerPerson
                )
        );
    }

    return settlements;
}

public SharedBill updateBill(
        Long id,
        SharedBillRequest request
) {

    SharedBill bill = sharedBillRepository
            .findById(id)
            .orElseThrow(() ->
                    new RuntimeException(
                            "Bill not found"
                    )
            );

    if (request.getTitle() == null
            || request.getTitle().trim().isEmpty()) {

        throw new RuntimeException(
                "Bill title is required"
        );
    }

    if (request.getAmount() == null
            || request.getAmount() <= 0) {

        throw new RuntimeException(
                "Bill amount must be greater than zero"
        );
    }

    if (request.getPaidByMemberId() == null) {

        throw new RuntimeException(
                "Paid by member is required"
        );
    }

    if (request.getParticipantIds() == null
            || request.getParticipantIds().isEmpty()) {

        throw new RuntimeException(
                "At least one participant is required"
        );
    }

    Member paidBy = memberRepository
            .findById(request.getPaidByMemberId())
            .orElseThrow(() ->
                    new RuntimeException(
                            "Paid by member not found"
                    )
            );

    List<Member> participants =
            memberRepository.findAllById(
                    request.getParticipantIds()
            );

    if (participants.size()
            != request.getParticipantIds().size()) {

        throw new RuntimeException(
                "One or more participants not found"
        );
    }

    bill.setTitle(
            request.getTitle().trim()
    );

    bill.setAmount(
            request.getAmount()
    );

    bill.setDate(
            request.getDate() != null
                    ? request.getDate()
                    : bill.getDate()
    );

    bill.setPaidBy(paidBy);

    bill.setParticipants(participants);

    return sharedBillRepository.save(bill);
}
}