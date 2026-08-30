package com.expense.expensetracker.repository;

import com.expense.expensetracker.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository
        extends JpaRepository<Member, Long> {

    boolean existsByNameIgnoreCase(String name);
}