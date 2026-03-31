"use client"
import React, { useState } from 'react'
import Image from 'next/image'

const ContactForm = () => {
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
  e.preventDefault()
  setLoading(true)

  const formData = new FormData(e.target)

  try {
    const res = await fetch("https://formsubmit.co/ajax/YOUR_EMAIL_HERE", {
      method: "POST",
      body: formData
    })

    const data = await res.json()

    console.log(data) // 👈 DEBUG THIS

    // ✅ FIXED CONDITION
    if (res.ok) {
      setSuccess(true)
      e.target.reset()
    }

  } catch (error) {
    console.error("Error:", error)
  }

  setLoading(false)
}

  return (
    <section className='dark:bg-darkmode md:pb-24 pb-16 relative'>
      <div className='container mx-auto max-w-6xl px-4'>
        <div className='grid md:grid-cols-12 grid-cols-1 gap-8'>

          <div className='col-span-6'>
            <h2 className='text-[40px] font-bold mb-9'>Get Online Consultation</h2>

            <form onSubmit={handleSubmit} className='flex flex-wrap w-full'>

              {/* Hidden fields */}
              <input type="hidden" name="_captcha" value="false" />

              <input name="firstName" required placeholder="First Name"
                className='w-full mb-3 px-4 py-2 border rounded-lg' />

              <input name="lastName" required placeholder="Last Name"
                className='w-full mb-3 px-4 py-2 border rounded-lg' />

              <input name="email" type="email" required placeholder="Email"
                className='w-full mb-3 px-4 py-2 border rounded-lg' />

              <select name="specialist" required
                className='w-full mb-3 px-4 py-2 border rounded-lg'>
                <option value="">Choose Specialist</option>
                <option>Baking & Pastry</option>
                <option>Exotic Cuisine</option>
                <option>French Desserts</option>
              </select>

              <input name="date" type="date" required
                className='w-full mb-3 px-4 py-2 border rounded-lg' />

              <input name="time" type="time" required
                className='w-full mb-3 px-4 py-2 border rounded-lg' />

              <button
                type="submit"
                disabled={loading}
                className='bg-primary text-white py-3 px-6 rounded-lg mt-3'
              >
                {loading ? "Sending..." : "Make an appointment"}
              </button>

            </form>
          </div>

          <div className='col-span-6'>
            <Image
              src='/images/contact-page/contact.jpg'
              alt='Contact'
              width={1300}
              height={0}
              style={{ width: '100%', height: 'auto' }}
            />
          </div>

        </div>
      </div>

      {/* ✅ SUCCESS POPUP */}
      {success && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-sm w-full">
            <h3 className="text-2xl font-bold mb-3 text-green-600">
              ✅ Success!
            </h3>
            <p className="text-gray-600 mb-6">
              Your appointment request has been sent.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="bg-primary text-white px-6 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </section>
  )
}

export default ContactForm