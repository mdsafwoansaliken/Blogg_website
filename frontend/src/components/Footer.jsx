const Footer = () => {
  return (
    <>
        <div className="mt-8 w-full bg-black px-8 md:px-[300px] flex md:flex-row flex-col space-y-4 md:space-y-0 justify-between text-sm md:text-md and py-8">
      <div className="flex flex-col text-white">
        <p>Featured Blogs</p>
        <p>Most viewed</p>
        <p>Readers Choice</p>
      </div>
      <div className="flex flex-col text-white">
        <p>Forum</p>
        <p>Support</p>
        <p>Recent</p>
      </div>

      <div className="flex flex-col text-white">
        <p>Privacy Policy</p>
        <p>About Us</p>
        <p>Terms  Conditions</p>
        <p>Terms of Service</p>
      </div>
    </div>
    <p className="py-2 pb-6 text-center text-white bg-black text-sm">All rights reserved @Blog_App 2023</p>
    </>

  )
}

export default Footer
