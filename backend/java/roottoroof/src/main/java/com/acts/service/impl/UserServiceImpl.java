package com.acts.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.acts.custom_exceptions.ResourceNotFoundException;
import com.acts.dto.ApiResponse;
import com.acts.dto.user.SignInDTO;
import com.acts.dto.user.SignupDTO;
import com.acts.dto.user.UserDTO;
import com.acts.model.Address;
import com.acts.model.User;
import com.acts.repository.AddressRepository;
import com.acts.repository.UserRepository;
import com.acts.service.UserService;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private AddressRepository addressRepository;

    public List<UserDTO> getAllUsers() {

        List<User> users = userRepository.findAll();
        return users.stream().map(user -> mapper.map(user, UserDTO.class)).collect(Collectors.toList());
    }

    public UserDTO getUserById(Integer id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid Id"));

        return mapper.map(user, UserDTO.class);
    }

    public UserDTO getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Email not found"));

        return mapper.map(user, UserDTO.class);
    }

    public UserDTO createUser(UserDTO userDTO) {

        User user = mapper.map(userDTO, User.class);
        User savedUser = userRepository.save(user);
        return mapper.map(savedUser, UserDTO.class);
    }

    public UserDTO updateUser(Integer id, UserDTO userDTO) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid user ID"));

        mapper.map(userDTO, user);
        userRepository.save(user);
        userDTO.setId(id); 

        return userDTO;

    }

    public ApiResponse deleteUser(Integer id) {

        Optional<Address> optionalAddress = addressRepository.findById(id);
        if (optionalAddress.isPresent())
            addressRepository.delete(optionalAddress.get());

        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid user id"));

        userRepository.delete(user);

        return new ApiResponse("User details deleted");

    }

    @Override
    public ApiResponse signUp(SignupDTO signupDTO) {
          

        Optional<User> user = userRepository.findByEmail(signupDTO.getEmail());

        if(user.isPresent()){
            return new ApiResponse("User is already registered");
        }

        userRepository.save(mapper.map(signupDTO, User.class));
        return new ApiResponse("Registration successful");
    }

    @Override
    public ApiResponse signIn(SignInDTO signInDTO) {
        
         Optional<User> user = userRepository.findByEmail(signInDTO.getEmail());
         if(user.isPresent()){

            if(user.get().getPassword().equals(signInDTO.getPassword())){
                return new ApiResponse("Loginn Successfully!:"+user.get().getFirstName());
            }
            else{
                return new ApiResponse("Invalid password");
            }

         }
        
        return new ApiResponse("User is not yet registered");
         

    }
}
