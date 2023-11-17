

const ProfilePosts = () => {
  return (
    <div className="w-full flex mt-8 space-x-2">
        {/* left */}
        <div className='w-[35%] h-[200px] flex justify-center items-center'>
          <img src="" alt="" className="h-full w-full object-cover"/>
        </div>
        {/* right */}
        <div className="flex flex-col w-[65%]">
          <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
          10 Uses of Artifical Intelligence in Day to Day Life
          </h1>
          <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
            <p>@blogg_app</p>
            <div className="flex space-x-2">
              <p>11/16/2023</p>
              <p>16:45</p>
            </div>
          </div>
          <p className="text-sm md:text-lg">
            Artificial Intelligence (AI) has seamlessly integrated into our daily routines, revolutionizing the way we live, work, and 
            interact with technology. From subtle conveniences to significant advancements, AI's pervasive influence is evident across 
            various aspects of our day-to-day lives. Its adaptive algorithms and problem-solving capabilities have ushered in a new era,
            shaping experiences and optimizing efficiency in numerous domains, fundamentally altering how we navigatethe modern world.
            </p>
        </div>
    </div>
  )
}

export default ProfilePosts
