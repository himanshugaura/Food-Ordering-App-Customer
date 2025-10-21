import React from 'react'

const ContactCard = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center px-4 py-6 lg:py-8'>
      <div className='w-full max-w-6xl h-full lg:h-auto flex flex-col lg:gap-6'>
        {/* Main Contact Card */}
        <div className='border border-gray-700 rounded-3xl p-6 lg:p-8 transition-shadow duration-300 flex-shrink-0'>
          <div className='text-center mb-6'>
            <h2 className='text-3xl lg:text-4xl font-bold mb-2 text-white bg-clip-text bg-gradient-to-r from-white to-gray-300'>
              Get in Touch
            </h2>
          </div>

          {/* Contact Information Grid */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 max-w-4xl mx-auto'>
            {/* Email */}
            <div className='rounded-xl p-4 lg:p-6 transition-all duration-300 hover:scale-105 border border-gray-700/50'>
              <div className='flex items-center justify-center mb-2'>
                <svg className='w-7 h-7 lg:w-8 lg:h-8 text-blue-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                </svg>
              </div>
              <p className='text-gray-400 text-xs lg:text-sm mb-1 text-center'>Email</p>
              <a href='mailto:foody@gmail.com' className='text-white text-sm lg:text-base font-medium hover:text-blue-400 transition-colors text-center block break-all'>
                foody@gmail.com
              </a>
            </div>

            {/* Phone */}
            <div className='rounded-xl p-4 lg:p-6 transition-all duration-300 hover:scale-105 border border-gray-700/50'>
              <div className='flex items-center justify-center mb-2'>
                <svg className='w-7 h-7 lg:w-8 lg:h-8 text-green-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' />
                </svg>
              </div>
              <p className='text-gray-400 text-xs lg:text-sm mb-1 text-center'>Phone</p>
              <a href='tel:+917452900000' className='text-white text-sm lg:text-base font-medium hover:text-green-400 transition-colors text-center block'>
                +91 74529XXXXX
              </a>
            </div>

            {/* Address */}
            <div className='rounded-xl p-4 lg:p-6 transition-all duration-300 hover:scale-105 border border-gray-700/50'>
              <div className='flex items-center justify-center mb-2'>
                <svg className='w-7 h-7 lg:w-8 lg:h-8 text-red-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
              </div>
              <p className='text-gray-400 text-xs lg:text-sm mb-1 text-center'>Address</p>
              <p className='text-white text-sm lg:text-base font-medium text-center'>
                123 Foodie Lane<br />
                Flavor Town, India
              </p>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className='overflow-hidden flex-1 lg:flex-none lg:h-[400px] min-h-0'>
          <div className='px-6 py-3 lg:py-4 border-b border-gray-700'>
            <h3 className='text-xl lg:text-2xl font-bold text-white'>Find Us Here</h3>
          </div>
          <div className='relative w-full h-[calc(100%-52px)] lg:h-[calc(400px-52px)]'>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63102.32221115339!2d-115.82737219501097!3d37.27306236939732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80b81baaba3e8c81%3A0x970427e38e6237ae!2sArea%2051%2C%20NV%2C%20USA!5e1!3m2!1sen!2sin!4v1760979234234!5m2!1sen!2sin" 
              className='absolute top-0 left-0 w-full h-full'
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Location Map"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactCard