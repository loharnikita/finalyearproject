'use client';


const PreviousNotesButton = () => {

  return (

    <button

      onClick={() => window.location.href="/notes"}

      className="flex items-center gap-4 rounded-lg  p-4 text-left"

    >

      📝

      <span className="text-lg font-semibold max-lg:hidden">

        Previous Notes

      </span>


    </button>

  );

};


export default PreviousNotesButton;