/**
 * @author ABOMNES Gauthier
 * @author BRETHEAU Yann
 * @author KEMEL Kevin
 */

// Configuration
var sizeRail = 4;


/*
*	Stockage rail :
*		- 0 : Ligne
*		- 1 : Gauche
*		- 2 : Droite
*/
var circuit = new Array();

//Direction
var CardinalEnum = {
	NORD: 0,
	EST: 3,
	SUD: 2,
	OUEST: 1,
};
var cardinal = CardinalEnum.NORD;


function addTrack(type)
{
	// On ajoute le nouveau rail
	if (type >= 0)
		circuit.push(type);
	else
		circuit.pop();

	// On prépare les variables
	var posX = 0;
	var moveX = 0;
	// -----
	var posZ = 0;
	var moveZ = 0;
	// On recréer le circuit
	cardinal = CardinalEnum.NORD;
	path = new THREE.CurvePath();
	scene.remove(group);
	group = new THREE.Group();
	scene.add(group);


	circuit.forEach(function(element) {

		var curve = null;
		var points = null;
		var geometry = null;
		var material = null;
		var curveObject = null;

		if (element == 0)
		{
			//Preparation
			switch (cardinal) {
				case CardinalEnum.NORD:
					moveX = 0;
					moveZ = -sizeRail;
					break;
				case CardinalEnum.EST:
					moveX = sizeRail;
					moveZ = 0;
					break;
				case CardinalEnum.SUD:
					moveX = 0;
					moveZ = sizeRail;
					break;
				case CardinalEnum.OUEST:
					moveX = -sizeRail;
					moveZ = 0;
					break;
				default:
				alert('ERROR : Problème de points cardinaux.');
			}

    	// Création de la courbe
		curve = new THREE.LineCurve3(
      	new THREE.Vector3(posX, 0, posZ), 
      	new THREE.Vector3((posX+moveX), 0,(posZ+moveZ))
   		);

    	path.add(curve);
		points = curve.getPoints();

    // Ajout des textures
    geometry = new THREE.BufferGeometry().copy(tabGeo[2]);
    material = tabMat[2];
    curveObject = new THREE.Mesh( geometry, material );

    // 
    curveObject.translateOnAxis(new THREE.Vector3(posX, 0, posZ), 1);
    curveObject.rotateY(cardinal*(Math.PI/2));

			//MAJ
			posX = (posX+moveX);
			posZ = (posZ+moveZ);

		}
		else if (element == 1) // Virage Gauche
		{
    var oldCardinal = cardinal;

    switch (cardinal) {
      case CardinalEnum.NORD:
        moveX = -sizeRail;
        moveZ = -sizeRail;
        // Courbe
        curve = new THREE.QuadraticBezierCurve3(
          new THREE.Vector3( posX, 0, posZ ),
          new THREE.Vector3( posX, 0, (posZ+moveZ)),
          new THREE.Vector3((posX+moveX), 0, (posZ+moveZ)),
        );
        // MAJ
        cardinal = CardinalEnum.OUEST;
        break;
      case CardinalEnum.EST:
        moveX = sizeRail;
        moveZ = -sizeRail;
        // Courbe
        curve = new THREE.QuadraticBezierCurve3(
          new THREE.Vector3( posX, 0, posZ ),
          new THREE.Vector3((posX+moveX), 0, posZ ),
          new THREE.Vector3((posX+moveX), 0, (posZ+moveZ)),
        );
        // MAJ
        cardinal = CardinalEnum.NORD;
        break;
      case CardinalEnum.SUD:
        moveX = sizeRail;
        moveZ = sizeRail;
        // Courbe
        curve = new THREE.QuadraticBezierCurve3(
          new THREE.Vector3( posX, 0, posZ ),
          new THREE.Vector3( posX, 0, (posZ+moveZ)),
          new THREE.Vector3((posX+moveX), 0, (posZ+moveZ)),
        );
        // MAJ
        cardinal = CardinalEnum.EST;
        break;
      case CardinalEnum.OUEST:
        moveX = -sizeRail;
        moveZ = sizeRail;
        // Courbe
        curve = new THREE.QuadraticBezierCurve3(
          new THREE.Vector3( posX, 0, posZ ),
          new THREE.Vector3((posX+moveX), 0, posZ ),
          new THREE.Vector3((posX+moveX), 0, (posZ+moveZ)),
        );
        // MAJs
        cardinal = CardinalEnum.SUD;
        break;
      default:
        alert('ERROR : Problème de repère.');
    }

    // Création de la courbe
    path.add(curve);
			points = curve.getPoints( 50 );

    geometry = new THREE.BufferGeometry().copy(tabGeo[1]);
    //geometry.translate (posX, 0, posZ)
    material = tabMat[1];
    curveObject = new THREE.Mesh( geometry, material );
    curveObject.translateOnAxis(new THREE.Vector3(posX, 0, posZ), 1);
    curveObject.rotateY(oldCardinal*(Math.PI/2));

    //MAJ
    posX = (posX+moveX);
    posZ = (posZ+moveZ);

		}
		else if (element == 2) // Virage droite
		{
    var oldCardinal = cardinal;

    switch (cardinal) {
      case CardinalEnum.NORD:
        moveX = sizeRail;
        moveZ = -sizeRail;
        // Courbe
        curve = new THREE.QuadraticBezierCurve3(
          new THREE.Vector3( posX, 0, posZ ),
          new THREE.Vector3( posX, 0, (posZ+moveZ)),
          new THREE.Vector3((posX+moveX), 0, (posZ+moveZ)),
        );
        // MAJ
        cardinal = CardinalEnum.EST;
        break;
      case CardinalEnum.EST:
        moveX = sizeRail;
        moveZ = sizeRail;
        // Courbe
        curve = new THREE.QuadraticBezierCurve3(
          new THREE.Vector3( posX, 0, posZ ),
          new THREE.Vector3((posX+moveX), 0, posZ ),
          new THREE.Vector3((posX+moveX), 0, (posZ+moveZ)),
        );
        // MAJ
        cardinal = CardinalEnum.SUD;
        break;
      case CardinalEnum.SUD:
        moveX = -sizeRail;
        moveZ = sizeRail;
        // Courbe
        curve = new THREE.QuadraticBezierCurve3(
          new THREE.Vector3( posX, 0, posZ ),
          new THREE.Vector3( posX, 0, (posZ+moveZ)),
          new THREE.Vector3((posX+moveX), 0, (posZ+moveZ)),
        );
        // MAJ
        cardinal = CardinalEnum.OUEST;
        break;
      case CardinalEnum.OUEST:
        moveX =-sizeRail;
        moveZ = -sizeRail;
        // Courbe
        curve = new THREE.QuadraticBezierCurve3(
          new THREE.Vector3( posX, 0, posZ ),
          new THREE.Vector3((posX+moveX), 0, posZ ),
          new THREE.Vector3((posX+moveX), 0, (posZ+moveZ)),
        );
        // MAJs
        cardinal = CardinalEnum.NORD;
        break;
      default:
        alert('ERROR : Problème de repère.');
    }

    // Création de la courbe
    path.add(curve);
    points = curve.getPoints( 50 );

    geometry = new THREE.BufferGeometry().copy(tabGeo[0]);
    //geometry.translate (posX, 0, posZ)
    material = tabMat[0];
    curveObject = new THREE.Mesh( geometry, material );

    curveObject.translateOnAxis(new THREE.Vector3(posX, 0, posZ), 1);
    curveObject.rotateY(oldCardinal*(Math.PI/2));

    //MAJ
    posX = (posX+moveX);
    posZ = (posZ+moveZ);

		}

  group.add(curveObject);
	});
}
