import { CSS3DObject } from './libs/renderer/CSS3DRenderer.js';
import {loadGLTF, loadAudio,loadVideo} from "./libs/loader/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './assets/targets/Innovation3.mind',
    });
    const {renderer, cssRenderer, scene, cssScene, camera} = mindarThree;


    //Load video
    for(var i=0;i<3;i++)
    {
        const video = await loadVideo("./assets/video/Innovation3/Demo"+i+".mp4");
        const texture = new THREE.VideoTexture(video);

        const geometry = new THREE.PlaneGeometry(1, 204/480);
        const material = new THREE.MeshBasicMaterial({map: texture});
        const plane = new THREE.Mesh(geometry, material);

        const anchor = mindarThree.addAnchor(i);
        anchor.group.add(plane);

        anchor.onTargetFound = () => {
              video.play();
        }
        anchor.onTargetLost = () => {
              video.pause();
        }
        video.addEventListener( 'play', () => {
              video.currentTime = 6;
        });
    }


    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
      cssRenderer.render(cssScene, camera);
    });
  }
  start();
});
