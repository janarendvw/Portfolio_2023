const gestures = [
  {
    icon: "swipe",
    text: "drag to move",
  },
    {
    icon: "pinch",
    text: "scroll to zoom",
    },
];

function GestureInstructions() {
  return (
    <div className="fixed z-50 left-5 bottom-5 flex items-center gap-12 opacity-50 hover:opacity-100 duration-500">
      {gestures.map((gesture, index) => {
        return (
          <div key={`gesture-${index}`} className="flex items-center gap-4">
            <span className="material-symbols-rounded text-2xl">
              {gesture.icon}
            </span>
            <span className="text-sm">{gesture.text}</span>
          </div>
        );
      })}
    </div>
  );
}

export default GestureInstructions;
