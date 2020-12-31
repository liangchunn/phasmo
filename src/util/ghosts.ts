import EmfImage from '../images/emf.png'
import FingerprintImage from '../images/fingerprint.png'
import FreezingImage from '../images/freezing.png'
import OrbImage from '../images/orb.png'
import SpiritImage from '../images/spirit.png'
import WritingImage from '../images/writing.png'
import NoneImage from '../images/none.png'

export const evidenceImage: Record<EvidenceKey | 'none', string> = {
  freezing: FreezingImage,
  emf: EmfImage,
  orb: OrbImage,
  spirit: SpiritImage,
  writing: WritingImage,
  fingerprints: FingerprintImage,
  none: NoneImage,
}

export const evidence = {
  freezing: 'Freezing Temperatures',
  emf: 'EMF Level 5',
  orb: 'Ghost Orb',
  spirit: 'Spirit Box',
  writing: 'Ghost Writing',
  fingerprints: 'Fingerprints',
}

export type EvidenceKey = keyof typeof evidence

export const allEvidenceKeys: EvidenceKey[] = Object.keys(
  evidence
) as EvidenceKey[]

export const ghosts = {
  phantom: 'Phantom',
  banshee: 'Banshee',
  mare: 'Mare',
  yurei: 'Yurei',
  demon: 'Demon',
  wraith: 'Wraith',
  jinn: 'Jinn',
  shade: 'Shade',
  oni: 'Oni',
  revenant: 'Revenant',
  poltergeist: 'Poltergeist',
  spirit: 'Spirit',
}

export type GhostKeys = keyof typeof ghosts

export const allGhostsKeys: GhostKeys[] = Object.keys(ghosts) as GhostKeys[]

export const ghostEvidence: Record<GhostKeys, EvidenceKey[]> = {
  phantom: ['freezing', 'emf', 'orb'],
  banshee: ['freezing', 'emf', 'fingerprints'],
  mare: ['freezing', 'orb', 'spirit'],
  yurei: ['freezing', 'orb', 'writing'],
  demon: ['freezing', 'spirit', 'writing'],
  wraith: ['freezing', 'spirit', 'fingerprints'],
  jinn: ['emf', 'orb', 'spirit'],
  shade: ['emf', 'orb', 'writing'],
  oni: ['emf', 'spirit', 'writing'],
  revenant: ['emf', 'writing', 'fingerprints'],
  poltergeist: ['orb', 'spirit', 'fingerprints'],
  spirit: ['spirit', 'writing', 'fingerprints'],
}

export const ghostDescription: Record<GhostKeys, string> = {
  phantom:
    'A Phantom is a Ghost that can possess the living, most commonly summoned by a Ouija Board. It also induces fear into those around it.',
  banshee:
    'A Banshee is a natural hunter and will attack anything. It has been known to stalk its prey one at a time until making its kill.',
  mare:
    'A Mare is the source of all nightmares, making it most powerful in the dark.',
  yurei:
    'A Yurei is a Ghost that has returned to the physical world, usually for the purpose of revenge or hatred.',
  demon:
    'A Demon is one of the worst Ghosts you can encounter. It has been known to attack without a reason.',
  wraith:
    'A Wraith is one of the most dangerous Ghosts you will find. It is also the only known ghost that has the ability of flight and has sometimes been known to travel through walls.',
  jinn:
    'A Jinn is a territorial Ghost that will attack when threatened. It also has been known to travel at significant speed.',
  shade:
    'A Shade is known to be a Shy Ghost. There is evidence that a Shade will stop all paranormal activity if there are multiple people nearby.',
  oni:
    'Onis are a cousin to the Demon and possess extreme strength. There have been rumors that they become more active around their prey',
  revenant:
    'A Revenant is a slow but violent Ghost that will attack indiscriminantly. It has been rumored to travel at a significantly high speed when hunting.',
  poltergeist:
    "One of the most famous Ghosts, a Poltergeist, also known as a noisy ghost can manipulate objects around it to spread fear into it's victims.",
  spirit:
    'A Spirit is the most common Ghost you will come across however it is still very powerful and dangerous. They are usually discovered at one of their hunting grounds after an unexplained death.',
}

export const ghostStrengths: Record<GhostKeys, string> = {
  phantom:
    'Looking at a Phantom will considerably drop your Sanity. This refers to any visible manifestations of the Phantom, including during a Hunt.',
  banshee: 'A Banshee will focus on one player at a time until it kills them.',
  mare:
    'Increased chance to attack in the dark. As such, it will do what it can to achieve this, such as turning off lights and tripping the fuse box.',
  yurei:
    "Yurei have been known to have a stronger effect on people's Sanity during a manifestation.",
  demon: 'Demons are the most aggressive and enter hunt mode more.',
  wraith:
    'Wraiths almost never touch the ground. Footprint sounds from a wraith will be rare to non-existent, and they can travel directly through walls doors without having to open them.',
  jinn: 'A Jinn will travel at a faster speed if its victim is far away.',
  shade:
    'As a shy ghost, a Shade will rarely perform actions in the presence of two or more people, making it harder to detect.',
  oni:
    'Oni are more active when people are nearby and have been seen moving objects at great speed.',
  revenant:
    'A Revenant will travel at a significantly faster speed when hunting a victim. Additionally, the Revenant can freely switch whoever it is targeting during a Hunt.',
  poltergeist:
    'A Poltergeist is capable of influencing more objects at once than any other Ghosts, and is capable of shutting multiple doors at once.',
  spirit:
    'The spirit has no discernible strengths, however it is known to increase its hunting as your sanity drops.',
}

export const ghostWeaknesses: Record<GhostKeys, string> = {
  phantom:
    'Taking a photo of the Phantom will make it temporarily disappear. This, however, will not stop a Hunt.',
  banshee:
    'Banshees fear the Crucifix, which boosts the Hunt-stopping range of one from 3 meters to 5 meters against it.',
  mare: 'Turning the lights on will lower its chance to attack.',
  yurei:
    'Using Smudge Sticks on the Yurei will cause it to not wander around the location for ~90 seconds.',
  demon:
    "Asking a Demon successful questions on the Ouija Board won't lower the user's sanity.",
  wraith:
    'Wraiths have a toxic reaction to Salt. If a Wraith comes into contact with a pile of salt, it will immediately cease attacking.',
  jinn:
    "Turning off the location's power source will prevent the Jinn from using its ability.",
  shade:
    'Conversely, a Shade will rarely start a Hunt when players are grouped together.',
  oni: 'Being more active will make the Oni easier to find and identify.',
  revenant: 'Hiding from the Revenant will cause it to move very slowly.',
  poltergeist: 'A Poltergeist is almost ineffective in an empty room.',
  spirit:
    'Using Smudge Sticks on a Spirit will stop it attacking for 180 seconds instead of 90.',
}
