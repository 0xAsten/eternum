import { useGLTF } from "@react-three/drei";
import { getUIPositionFromColRow, pseudoRandom } from "../../../utils/utils";
import * as THREE from "three";
import { useMemo } from "react";
import { Hexagon } from "../../../../types";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Subtropical_Desert_Terrain_1: THREE.Mesh;
    Subtropical_Desert_Terrain_2: THREE.Mesh;
    Cacti: THREE.Mesh;
  };
  materials: {
    ["Orange Sand"]: THREE.MeshStandardMaterial;
    ["Gray Dirt"]: THREE.MeshStandardMaterial;
    Cactus: THREE.MeshStandardMaterial;
  };
};

export function SubtropicalDesertBiome({ hexes, zOffsets }: { hexes: any[]; zOffsets?: boolean }) {
  const { nodes, materials } = useGLTF("/models/biomes/subtropicalDesert.glb") as GLTFResult;

  const defaultTransform = new THREE.Matrix4()
    .makeRotationX(Math.PI / 2)
    .multiply(new THREE.Matrix4().makeScale(3, 3, 3));

  const geometry1 = nodes.Subtropical_Desert_Terrain_1.geometry.clone();
  geometry1.applyMatrix4(defaultTransform);

  const geometry2 = nodes.Subtropical_Desert_Terrain_2.geometry.clone();
  geometry2.applyMatrix4(defaultTransform);

  const geometry3 = nodes.Cacti.geometry.clone();
  geometry3.applyMatrix4(defaultTransform);

  const meshes = useMemo(() => {
    const instancedMesh1 = new THREE.InstancedMesh(geometry1, materials["Orange Sand"], hexes.length);
    const instancedMesh2 = new THREE.InstancedMesh(geometry2, materials["Gray Dirt"], hexes.length);
    const instancedMesh3 = new THREE.InstancedMesh(geometry3, materials.Cactus, hexes.length);
    instancedMesh1.receiveShadow = true;
    instancedMesh3.castShadow = true;
    let idx = 0;
    let matrix = new THREE.Matrix4();
    hexes.forEach((hex: any) => {
      const { x, y, z } = hex;
      // rotate hex randomly on 60 * n degrees
      const seededRandom = pseudoRandom(hex.x, hex.y);
      matrix.makeRotationZ((Math.PI / 3) * Math.floor(seededRandom * 6));
      matrix.setPosition(x, y, zOffsets ? z : 0.32);
      instancedMesh1.setMatrixAt(idx, matrix);
      instancedMesh2.setMatrixAt(idx, matrix);
      instancedMesh3.setMatrixAt(idx, matrix);
      idx++;
    });

    instancedMesh1.computeBoundingSphere();
    instancedMesh1.frustumCulled = true;
    instancedMesh2.computeBoundingSphere();
    instancedMesh2.frustumCulled = true;
    instancedMesh3.computeBoundingSphere();
    instancedMesh3.frustumCulled = true;
    return [instancedMesh1, instancedMesh2, instancedMesh3];
  }, [hexes]);

  return (
    <>
      <primitive object={meshes[0]} />
      <primitive object={meshes[1]} />
      <primitive object={meshes[2]} />
    </>
  );
}
