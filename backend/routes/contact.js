import express from 'express'
import { body, validationResult } from 'express-validator'
import rateLimit from 'express-rate-limit'
import Contact from '../models/Contact.js'
import transporter from "../utils/sendMail.js";

const router = express.Router()

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: { error: 'Too many messages sent. Please try again later.' },
})

const validateContact = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('email').trim().isEmail().withMessage('Valid email required').normalizeEmail(),
  body('subject').trim().notEmpty().withMessage('Subject is required').isLength({ max: 200 }),
  body('message').trim().isLength({ min: 10, max: 2000 }).withMessage('Message must be 10–2000 chars'),
]

// POST /api/contact
router.post('/', contactLimiter, validateContact, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const { name, email, subject, message } = req.body
    const ip = req.ip || req.connection?.remoteAddress

    const contact = await Contact.create({ name, email, subject, message, ip })
    // Email to Deepanshu
    transporter.sendMail({
      from: '"Deepanshu Kumar" <work.deepanshukumar@gmail.com>',
      to: 'work.deepanshukumar@gmail.com',
      subject: `Portfolio Contact - ${subject}`,
      html: `
    <h2>New Portfolio Contact Message</h2>

    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Subject:</strong> ${subject}</p>

    <p><strong>Message:</strong></p>
    <p>${message}</p>
  `,
    }).catch(err => console.error('Owner mail failed:', err.message));

    // Auto Reply to Visitor
    transporter.sendMail({
      from: '"Deepanshu Kumar" <work.deepanshukumar@gmail.com>',
      to: email,
      subject: "Thanks for Reaching Out | Deepanshu Kumar",
      html: `
    <h2>Thank You for Getting in Touch 🚀</h2>

    <p>Hi ${name},</p>

    <p> Thank you for reaching out through my portfolio website. I have successfully received your message and truly appreciate your interest. </p>

    <p> I will review your inquiry and get back to you as soon as possible, usually within 24–48 hours. </p>

    <p> In the meantime, feel free to explore my work and connect with me on LinkedIn or GitHub to learn more about my projects and experience. </p>

    <p> Looking forward to connecting with you. </p>

    <br/>

    <p> Best Regards,<br/> <strong>Deepanshu Kumar</strong><br/> MERN Stack Developer<br/> Full Stack Web Developer </p>

    <br/>

<p style="color: #666; font-size: 12px;"> This is an automated confirmation email to let you know that your message has been received successfully. </p>
  `,
    }).catch(err => console.error('Visitor mail failed:', err.message));
    res.status(201).json({ success: true, message: 'Message received. Thank you!', id: contact._id })
  } catch (err) {
    console.error('Contact save error:', err)
    res.status(500).json({ error: 'Server error. Please try again.' })
  }
})

// GET /api/contact (admin)
router.get('/', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 })
    res.json(messages)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

// DELETE /api/contact/:id (admin)
router.delete('/:id', async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
