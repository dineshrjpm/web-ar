import { CSS3DObject } from '../libs/renderer/CSS3DRenderer.js';
import {loadGLTF, loadAudio} from "../libs/loader/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: '../assets/targets/course-banner.mind',
    });
    const {renderer, cssRenderer, scene, cssScene, camera} = mindarThree;

    const obj = new CSS3DObject(document.querySelector("#ar-div"));
    const anchor1 = mindarThree.addCSSAnchor(0);
    anchor1.group.add(obj);

	
	const anchor = mindarThree.addAnchor(0); 	
	const audioClip = await loadAudio('../assets/sounds/musicband-background.mp3');
    const listener = new THREE.AudioListener();
    camera.add(listener);

    const audio = new THREE.PositionalAudio(listener);
    anchor.group.add(audio);

    audio.setBuffer(audioClip);
	audio.setVolume(20);
    audio.setRefDistance(100);
    audio.setLoop(false);

    anchor.onTargetFound = () => {
      audio.play();
    }
    anchor.onTargetLost = () => {
      audio.pause();
    }

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      cssRenderer.render(cssScene, camera);
    });
  }
  start();
});
