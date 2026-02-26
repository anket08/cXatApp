package com.chat.cxat.service;

import com.chat.cxat.model.ChatRoom;
import com.chat.cxat.model.Message;
import com.chat.cxat.repository.ChatRoomRepository;
import com.chat.cxat.repository.MessageRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class ChatService {

    private final ChatRoomRepository chatRoomRepository;
    private final MessageRepository messageRepository;
    private final RedisService redisService;

    public ChatService(ChatRoomRepository chatRoomRepository,
                    MessageRepository messageRepository,
                    RedisService redisService) {

        this.chatRoomRepository = chatRoomRepository;
        this.messageRepository = messageRepository;
        this.redisService = redisService;
    }


    // ==========================
    // CREATE ROOM
    // ==========================

    public ChatRoom createPrivateRoom() {

        String roomId = generateUniqueRoomId();

        ChatRoom room = new ChatRoom();
        room.setId(roomId);
        room.setType("PRIVATE");

        return chatRoomRepository.save(room);
    }



    // ==========================
    // RANDOM ROOM ID
    // ==========================

    private String generateUniqueRoomId() {

        Random random = new Random();
        String roomId;

        do {

            int number =
                    1000 + random.nextInt(9000);

            roomId = String.valueOf(number);

        } while (chatRoomRepository.existsById(roomId));

        return roomId;
    }



    // ==========================
    // SEND MESSAGE
    // ==========================

    public Message sendMessage(Message message) {

        // Save in MongoDB
        Message saved =
                messageRepository.save(message);


        /*
        Cache Invalidation
        Delete Redis cache when new message arrives
         */
        redisService.deleteChatCache(
                saved.getRoomId()
        );


        return saved;
    }



    // ==========================
    // ROOM EXISTS
    // ==========================

    public boolean roomExists(String roomId) {

        return chatRoomRepository.existsById(roomId);
    }



    // ==========================
    // GET MESSAGES
    // ==========================

    public List<Message> getMessages(String roomId) {


        /*
        1️⃣ Try Redis Cache First
         */

        List<Message> cachedMessages =
                redisService.getCachedMessages(roomId);


        if(cachedMessages != null){

            return cachedMessages;
        }


        /*
        2️⃣ Fetch From MongoDB
         */

        List<Message> messages =
                messageRepository
                        .findByRoomIdOrderByCreatedAtAsc(roomId);



        /*
        3️⃣ Store in Redis
        TTL = 1 Hour
         */

        redisService.cacheMessages(
                roomId,
                messages
        );


        return messages;
    }

}