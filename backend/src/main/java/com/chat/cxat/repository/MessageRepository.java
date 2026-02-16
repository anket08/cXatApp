package com.chat.cxat.repository;

import com.chat.cxat.model.Message;

// import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface MessageRepository extends MongoRepository<Message, String> {
    List<Message> findByRoomIdOrderByCreatedAtAsc(String roomId);
}


// MongoDB me `id` field String type ka hota hai kyunki yeh ObjectId hota hai.
// Lekin `roomId` ek alag field hai jo message kis room ka hai woh batata hai.
// `roomId` ko hum Long type me rakh rahe hain kyunki frontend aur logic me
// rooms numeric IDs se identify ho rahe hain.
//
// Isliye:
// id      → String (MongoDB ObjectId)
// roomId  → Long   (room identification)
//
// Dono fields alag purpose ke liye hain, isliye unka type alag hona sahi hai.