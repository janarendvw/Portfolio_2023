function Artwork() {
  return (
    <div className="flex flex-col gap-12 my-24 px-8 items-center">
      <h1 className="text-5xl font-semibold">Artwork</h1>
      <p className="max-w-xl text-center">
        My graphic work consists out of several poster designs and 3d
        compositions. I like to experiment with different styles and techniques.
        I am always looking for new ways to improve my skills and learn new
        things. If you want to see more of my work, you can check out my
        instagram page
      </p>
      <a
        href="https://www.instagram.com/deltadesign.nl/"
        target="_blank"
        className="bg-gradient-to-br from-violet-500 to-red-400 text-white px-4 py-2 rounded mt-4 w-fit flex items-center gap-2 font-semibold"
      >
       <span className="material-symbols-rounded">view_in_ar</span> 3D Artwork
      </a>

      
    </div>
  );
}

export default Artwork;
