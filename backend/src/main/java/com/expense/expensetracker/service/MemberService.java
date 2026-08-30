package com.expense.expensetracker.service;

import com.expense.expensetracker.entity.Member;
import com.expense.expensetracker.repository.MemberRepository;
import com.expense.expensetracker.repository.SharedBillRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemberService {

    private final MemberRepository memberRepository;

    private final SharedBillRepository
            sharedBillRepository;


    public MemberService(

            MemberRepository memberRepository,

            SharedBillRepository
                    sharedBillRepository

    ) {

        this.memberRepository =
                memberRepository;

        this.sharedBillRepository =
                sharedBillRepository;

    }


    /* =========================
       ADD MEMBER
    ========================= */

    public Member addMember(
            Member member
    ) {

        if (
                member.getName() == null
                        ||
                member.getName()
                        .trim()
                        .isEmpty()
        ) {

            throw new RuntimeException(
                    "Member name is required"
            );

        }


        String name =
                member.getName()
                        .trim();


        if (
                memberRepository
                        .existsByNameIgnoreCase(
                                name
                        )
        ) {

            throw new RuntimeException(
                    "Member already exists"
            );

        }


        member.setName(name);


        return memberRepository
                .save(member);

    }


    /* =========================
       GET ALL MEMBERS
    ========================= */

    public List<Member> getAllMembers() {

        return memberRepository
                .findAll();

    }


    /* =========================
       GET MEMBER BY ID
    ========================= */

    public Member getMemberById(
            Long id
    ) {

        return memberRepository
                .findById(id)
                .orElseThrow(
                        () ->
                                new RuntimeException(
                                        "Member not found"
                                )
                );

    }


    /* =========================
       DELETE MEMBER
    ========================= */

    public void deleteMember(
            Long id
    ) {

        if (
                !memberRepository
                        .existsById(id)
        ) {

            throw new RuntimeException(
                    "Member not found"
            );

        }


        /*
         Check whether this member
         is already used in a
         shared bill.
        */

        boolean isBillPayer =
                sharedBillRepository
                        .existsByPaidById(
                                id
                        );


        boolean isParticipant =
                sharedBillRepository
                        .existsByParticipants_Id(
                                id
                        );


        if (
                isBillPayer
                        ||
                isParticipant
        ) {

            throw new RuntimeException(
                    "Cannot delete member because "
                            +
                            "the member is used in "
                            +
                            "shared bills"
            );

        }


        memberRepository
                .deleteById(id);

    }

}