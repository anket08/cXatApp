package com.chat.cxat.service;

import com.chat.cxat.model.User;
import com.chat.cxat.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // REGISTER USER
    public User register(User user) {
        return userRepository.save(user);
    }

    // FIND USER BY USERNAME
    public User findByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElse(null);
    }
}