import { useEffect } from 'react'
import * as THREE from 'three'

type Props = {}

function HomeBackground({}: Props) {

    useEffect(() => {
        const canvas = document.getElementById('bg') as HTMLCanvasElement
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.toneMapping = THREE.ACESFilmicToneMapping
        renderer.toneMappingExposure = 1
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        camera.position.set(0, 0, -1)
        camera.lookAt(0, 0, -5)
        const scene = new THREE.Scene()

        const particleCount = 10000
        const particleGeometry = new THREE.BufferGeometry()
        const particleMaterial = new THREE.PointsMaterial({
            size: 0.003,
            sizeAttenuation: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
        })

        const particlePosArray = new Float32Array(particleCount * 3)

        for (let i = 0; i < particleCount * 3; i++) {
            let x = (Math.random() - 0.5) * 5
            let y = (Math.random() - 0.5) * 5
            let z = (Math.random() - 0.5) * 5

            particlePosArray[i] = x
            particlePosArray[i + 1] = y
            particlePosArray[i + 2] = z
        }

        particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePosArray, 3))

        const particleMesh = new THREE.Points(particleGeometry, particleMaterial)

        scene.add(particleMesh)

        let elapsedTime = 0

        const clock = new THREE.Clock()

        const mousePos = {
            x: 0,
            y: 0
        }

        const updateMousePos = (e: MouseEvent) => {
            mousePos.x = e.clientX / window.innerWidth - 0.5
            mousePos.y = e.clientY / window.innerHeight - 0.5
        }

        const resize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight)
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
        }

        window.addEventListener('resize', resize)
        window.addEventListener('mousemove', updateMousePos)

        const animate = () => {
            elapsedTime = clock.getElapsedTime()
            particleMesh.rotation.z = elapsedTime * -0.06
            requestAnimationFrame(animate)
            renderer.render(scene, camera)
        }

        animate()

        return () => {
            scene.remove(particleMesh)
            renderer.renderLists.dispose()

            window.removeEventListener('mousemove', updateMousePos)
            window.removeEventListener('resize', resize)
        }


    }, [])
  return (
    <canvas id="bg" className="w-screen h-screen absolute top-0 left-0 -z-10"></canvas>
  )
}

export default HomeBackground