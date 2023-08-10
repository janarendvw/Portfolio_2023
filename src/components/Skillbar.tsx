
type Props = {
    skillName: string
    skillLevel: number
}

function Skillbar({skillLevel, skillName}: Props) {
    const properties = {
        width: `${skillLevel}%`,
        totalWidth: '100%'
    }
  return (
    <div className='py-1 max-w-lg my-2'>
        <h2 className='text-white text-xl'>{skillName}</h2>
    <div className={`bg-white/10 w-[${properties.totalWidth}] h-1 my-2`}>
        <div className='bg-white h-full' style={{width: properties.width}}></div>
    </div>
    </div>
  )
}

export default Skillbar