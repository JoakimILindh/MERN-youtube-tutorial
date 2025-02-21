import User from '../models/user.model.js'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import { generateToken } from '../lib/generateToken.js';
import ROLES from '../constants/roles.js';

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if(!name || !email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' })
  }

  const normalizedEmail = email.trim().toLowerCase();

  if(await User.exists({ email: normalizedEmail })) {
    return res.status(409).json({ message: 'User already exists' })
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({
    name,
    email: normalizedEmail,
    password: hashedPassword
  })

  const token = generateToken(user)

  res.status(201).json({ _id: user._id, name: user.name, token, role: user.role })
})

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if(!email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' })
  }

  const user = await User.findOne({ email }).exec()

  if(!user) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const match = await bcrypt.compare(password, user.password)

  if(!match) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const token = generateToken(user)

  res.status(200).json({ _id: user._id, name: user.name, token, role: user.role })
})


export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id, "-password").exec()
  if(!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  res.status(200).json(user)
})

export const updateRole = asyncHandler(async (req, res) => {
  const { role } = req.body

  const rolesArray = Object.values(ROLES)

  if(!role) {
    return res.status(400).json({ message: `Please enter a role. (${rolesArray.join(', ')})` })
  }

  const normalizedRole = role.trim().toLowerCase()
  if(!rolesArray.includes(normalizedRole)) {
    return res.status(400).json({ message: `Roles must be one of the following. (${rolesArray.join(', ')})` })
  }

  const user = await User.findById(req.params.id).exec()

  if(!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  user.role = normalizedRole;
  await user.save()

  res.status(200).json({ message: 'Role updated to ' + normalizedRole })
})

export const checkToken = asyncHandler(async (req, res) => {
  res.status(200).json({
    _id: req.user._id, 
    name: req.user.name,
    role: req.user.role
  })
})