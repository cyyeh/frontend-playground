import * as THREE from 'three'

import { OrbitControls } from './OrbitControls'
import WebGL from './WebGL'

const cavasIds = ['c1']

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement
  const pixelRatio = window.devicePixelRatio
  const width = (canvas.clientWidth * pixelRatio) | 0
  const height = (canvas.clientHeight * pixelRatio) | 0
  const needResize = canvas.width !== width || canvas.height !== height
  if (needResize) {
    renderer.setSize(width, height, false)
  }
  return needResize
}

function Fundamentals(canvasId) {
  const checkbox = document.getElementById('c1-checkbox')
  let animationFrameId = undefined

  checkbox.addEventListener('change', function () {
    cancelAnimationFrame(animationFrameId)
    if (this.checked) {
      requestAnimationFrame(renderWithRotation)
    }
  })

  function renderWithRotation(time) {
    time *= 0.001 // covert time to seconds

    // set the aspect of the camera to the aspect of the canvas's display size
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
    }

    cubes.forEach((cube, index) => {
      const speed = 0.2 + index * 0.001
      const rot = time * speed

      cube.rotation.x = rot
      cube.rotation.y = rot
    })

    renderer.render(scene, camera)

    animationFrameId = requestAnimationFrame(renderWithRotation)
  }

  function renderWithoutRotation() {
    // set the aspect of the camera to the aspect of the canvas's display size
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
    }

    renderer.render(scene, camera)
  }

  function makeInstance(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({ color })

    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    cube.position.x = x

    return cube
  }

  const canvas = document.querySelector(`#${canvasId}`)
  /**
   * Note there are some esoteric details here. If you don't pass a canvas into three.js
   * it will create one for you but then you have to add it to your document.
   * Where to add it may change depending on your use case and you'll have to change your code
   * so I find that passing a canvas to three.js feels a little more flexible.
   * I can put the canvas anywhere and the code will find it whereas if I had code to insert the canvas into to
   * the document I'd likely have to change that code if my use case changed.
   */
  /**
   * After we look up the canvas we create a WebGLRenderer. The renderer is the thing responsible for actually
   * taking all the data you provide and rendering it to the canvas. In the past there have been other renderers like
   * CSSRenderer, a CanvasRenderer and in the future there may be a WebGL2Renderer or WebGPURenderer.
   * For now there's the WebGLRenderer that uses WebGL to render 3D to the canvas.
   */
  const renderer = new THREE.WebGLRenderer({ canvas })

  // fov, aspect, near and far define a "frustum", another 3d shape like sphere, cube, prism
  const fov = 75 // field of view, 75 degrees in the vertical dimension
  const aspect = 2 // display aspect of the canvas, by default a canvas is 300x150 pixels which makes the aspect 300/150
  // near and far represent the space in front of the camera that will be rendered
  // anything before that range or after that range will be clipped (not drawn)
  const near = 0.1
  const far = 5
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  // The camera defaults to looking down the -Z axis with +Y up
  camera.position.z = 2

  const controls = new OrbitControls(camera, canvas)
  controls.enableDamping = true
  controls.target.set(0, 0, 0)
  controls.update()

  const scene = new THREE.Scene()

  // add mesh(geometry + material)
  const boxWidth = 1
  const boxHeight = 1
  const boxDepth = 1
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth)
  const cubes = [
    makeInstance(geometry, 0x44aa88, 0),
    makeInstance(geometry, 0x8844aa, -2),
    makeInstance(geometry, 0xaa8844, 2)
  ]

  // add light
  const color = 0xffffff
  const intensity = 1
  const light = new THREE.DirectionalLight(color, intensity)
  light.position.set(-1, 2, 4)
  scene.add(light)

  controls.addEventListener('change', renderWithoutRotation)
  window.addEventListener('resize', renderWithoutRotation)

  animationFrameId = requestAnimationFrame(renderWithRotation)
}

function main() {
  Fundamentals(cavasIds[0])
}

if (WebGL.isWebGLAvailable()) {
  // Initiate function or other initializations here
  main()
} else {
  const warning = WebGL.getWebGLErrorMessage()
  canvasIds.forEach(canvasId => {
    document.getElementById(canvasId).appendChild(warning)
  })
}
