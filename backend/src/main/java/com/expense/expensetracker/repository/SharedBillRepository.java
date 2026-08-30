package com.expense.expensetracker.repository;

import com.expense.expensetracker.entity.SharedBill;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SharedBillRepository
        extends JpaRepository<SharedBill, Long> {

    boolean existsByPaidById(Long memberId);

    boolean existsByParticipants_Id(Long memberId);
}