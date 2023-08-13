const gestures = [
  {
    icon: "swipe",
    text: "swipe to move",
  },
    {
    icon: "pinch",
    text: "scroll to zoom",
    },
];

function GestureInstructions() {
  return (
    <div className="fixed z-50 left-5 bottom-5 flex items-center gap-12 opacity-50 hover:opacity-100 duration-500">
      {gestures.map((gesture) => {
        return (
          <div className="flex items-center gap-4">
            <span className="material-symbols-rounded text-2xl">
              {gesture.icon}
            </span>
            <span className="text-white text-sm">{gesture.text}</span>
          </div>
        );
      })}
    </div>
  );
}

export default GestureInstructions;
