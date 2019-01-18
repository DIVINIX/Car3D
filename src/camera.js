/**
 * @author ABOMNES Gauthier
 * @author BRETHEAU Yann
 * @author KEMEL Kevin
 */

// Variables gestion RUN,vitesse et camera
var runState = false;
var camType = 0;
var vitesse = 0;

// Changement de l'état en fonction du bouton
function run ()
{
	if (runState)
	{
		runState = false;
	}
	else
	{
		runState = true;
	}
}

// Fonction de gestion de la vitesse
function speedChange (speed)
{

	if (speed >= 0 && speed <= 10)
	{
		vitesse = speed;
	}
	else
	{
		// Do nothing
	}
}

// Fonction permettant le changement de camera, on redefinit un nouveau control
// et une nouvelle position 
function changeCamera (cameraType)
{
	if (cameraType ==0)
	{
		// Camera de base
		camera.position.z = 30;
		camera.position.y = 5
		controls = new THREE.OrbitControls(camera, renderer.domElement);
		controls.minDistance = 2;
		controls.maxDistance = 3000;
		camType = cameraType;
	}
	else if (cameraType ==1)
	{
		// Camera qui suit la voiture
		camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
		camera.position.x = 5;
		camera.position.y = 5;
		camera.position.z = 5;
		camera.lookAt(voiture.position);
		camType = cameraType;
	}
	else
	{
	  // Do nothing
	}
}