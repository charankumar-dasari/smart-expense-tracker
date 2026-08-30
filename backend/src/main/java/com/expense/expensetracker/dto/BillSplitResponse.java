package com.expense.expensetracker.dto;

import java.util.ArrayList;
import java.util.List;

public class BillSplitResponse {

    private Long billId;
    private String billTitle;
    private Double totalAmount;
    private Integer participantCount;
    private Double amountPerPerson;
    private String paidBy;

    private List<ParticipantShare> participants =
            new ArrayList<>();

    public static class ParticipantShare {

        private Long memberId;
        private String memberName;
        private Double shareAmount;
        private Double paidAmount;
        private Double amountOwed;

        public ParticipantShare() {
        }

        public Long getMemberId() {
            return memberId;
        }

        public void setMemberId(Long memberId) {
            this.memberId = memberId;
        }

        public String getMemberName() {
            return memberName;
        }

        public void setMemberName(String memberName) {
            this.memberName = memberName;
        }

        public Double getShareAmount() {
            return shareAmount;
        }

        public void setShareAmount(Double shareAmount) {
            this.shareAmount = shareAmount;
        }

        public Double getPaidAmount() {
            return paidAmount;
        }

        public void setPaidAmount(Double paidAmount) {
            this.paidAmount = paidAmount;
        }

        public Double getAmountOwed() {
            return amountOwed;
        }

        public void setAmountOwed(Double amountOwed) {
            this.amountOwed = amountOwed;
        }
    }

    public Long getBillId() {
        return billId;
    }

    public void setBillId(Long billId) {
        this.billId = billId;
    }

    public String getBillTitle() {
        return billTitle;
    }

    public void setBillTitle(String billTitle) {
        this.billTitle = billTitle;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public Integer getParticipantCount() {
        return participantCount;
    }

    public void setParticipantCount(Integer participantCount) {
        this.participantCount = participantCount;
    }

    public Double getAmountPerPerson() {
        return amountPerPerson;
    }

    public void setAmountPerPerson(Double amountPerPerson) {
        this.amountPerPerson = amountPerPerson;
    }

    public String getPaidBy() {
        return paidBy;
    }

    public void setPaidBy(String paidBy) {
        this.paidBy = paidBy;
    }

    public List<ParticipantShare> getParticipants() {
        return participants;
    }

    public void setParticipants(
            List<ParticipantShare> participants
    ) {
        this.participants = participants;
    }
}