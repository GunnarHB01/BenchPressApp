/**
 * Form Videos Database for Nippard Bench Press Program
 * Contains YouTube video IDs and form tips for all exercises
 * All videos are from Jeff Nippard's YouTube channel for consistency
 */

interface ExerciseVideo {
  youtubeId: string;
  title: string;
  tips: string[];
}

type FormVideosDatabase = {
  [key: string]: ExerciseVideo;
};

const formVideosDatabase: FormVideosDatabase = {
  // ======= MAIN BARBELL LIFTS =======
  'BARBELL BENCH PRESS': {
    youtubeId: 'vcBig73ojpE',
    title: 'Barbell Bench Press',
    tips: [
      'Retract shoulder blades and maintain arch',
      'Lower bar to nipple line with control',
      'Drive through heels and press explosively',
      'Keep wrists straight and grip secure'
    ]
  },
  'PAUSE BARBELL BENCH PRESS': {
    youtubeId: 'BYKScL2sgCs',
    title: 'Pause Bench Press',
    tips: [
      'Pause for 1-2 seconds on chest',
      'Maintain tension during pause',
      'Keep shoulder blades retracted',
      'Press explosively from chest'
    ]
  },
  'BARBELL SPEED BENCH PRESS': {
    youtubeId: 'ljO4jZ9zTdY',
    title: 'Speed Bench Press',
    tips: [
      'Focus on explosive concentric movement',
      'Control the eccentric (lowering) phase',
      'Maintain perfect form at speed',
      'Use lighter weight for speed work'
    ]
  },
  'BACK SQUAT': {
    youtubeId: 'bEv6CCg2BC8',
    title: 'Back Squat',
    tips: [
      'Keep chest up and core braced',
      'Descend to proper depth (hip crease below knee)',
      'Drive through heels on ascent',
      'Maintain neutral spine throughout'
    ]
  },
  'SQUAT': {
    youtubeId: 'bEv6CCg2BC8',
    title: 'Squat',
    tips: [
      'Keep chest up and core braced',
      'Descend to proper depth',
      'Drive through heels',
      'Maintain knee tracking'
    ]
  },
  'BODYWEIGHT SQUAT': {
    youtubeId: 'bEv6CCg2BC8',
    title: 'Bodyweight Squat',
    tips: [
      'Same form principles as weighted squats',
      'Focus on mobility and range of motion',
      'Control the descent',
      'Drive up with power'
    ]
  },
  'DEADLIFT': {
    youtubeId: 'VL5Ab0T07e4',
    title: 'Deadlift',
    tips: [
      'Start with bar over mid-foot',
      'Keep back neutral and chest up',
      'Drive through heels and hips',
      'Finish with hips fully extended'
    ]
  },

  // ======= BENCH PRESS VARIATIONS =======
  'DUMBBELL BENCH PRESS': {
    youtubeId: 'QsYre__-aro',
    title: 'Dumbbell Bench Press',
    tips: [
      'Control the dumbbells throughout range',
      'Lower to stretch position',
      'Press in slight arc motion',
      'Keep shoulders stable'
    ]
  },
  'INCLINE BENCH PRESS': {
    youtubeId: '8iPEnn-ltC8',
    title: 'Incline Bench Press',
    tips: [
      'Set bench to 30-45 degree angle',
      'Touch bar to upper chest',
      'Drive feet into ground',
      'Press in straight line'
    ]
  },
  'INCLINE BARBELL BENCH PRESS': {
    youtubeId: '8iPEnn-ltC8',
    title: 'Incline Barbell Bench Press',
    tips: [
      'Set incline to 30-45 degrees',
      'Touch bar to upper chest/clavicle area',
      'Maintain shoulder blade retraction',
      'Drive through heels'
    ]
  },
  'ECCENTRIC-ACCENTUATED BARBELL INCLINE PRESS': {
    youtubeId: 'yKhDNrK_jRA',
    title: 'Eccentric-Accentuated Incline Press',
    tips: [
      'Slow 3-4 second negative phase',
      'Explosive concentric movement',
      'Focus on muscle tension',
      'Use lighter weight than normal'
    ]
  },
  'INCLINE DUMBBELL BENCH PRESS': {
    youtubeId: '8iPEnn-ltC8',
    title: 'Incline Dumbbell Press',
    tips: [
      'Set incline to 30-45 degrees',
      'Lower dumbbells to stretch',
      'Press with control',
      'Squeeze chest at top'
    ]
  },
  'DUMBBELL INCLINE PRESS': {
    youtubeId: '8iPEnn-ltC8',
    title: 'Dumbbell Incline Press',
    tips: [
      'Start at shoulder height',
      'Lower with control to stretch',
      'Press dumbbells up and together',
      'Focus on upper chest activation'
    ]
  },
  'BARBELL PIN PRESS': {
    youtubeId: '8d2BUba3oNE',
    title: 'Barbell Pin Press',
    tips: [
      'Set pins at desired height',
      'Start from dead stop position',
      'Drive explosively from pins',
      'Focus on lockout strength'
    ]
  },
  'FLOOR PRESS': {
    youtubeId: 'vcBig73ojpE',
    title: 'Floor Press',
    tips: [
      'Lie flat on floor with knees bent',
      'Lower until triceps touch floor',
      'Pause briefly then press up',
      'Great for tricep and lockout strength'
    ]
  },
  'CLOSE GRIP BENCH PRESS': {
    youtubeId: '9YfGSRVsKXw',
    title: 'Close Grip Bench Press',
    tips: [
      'Grip about shoulder width apart',
      'Keep elbows close to body',
      'Lower to lower chest',
      'Focus on tricep engagement'
    ]
  },
  'CABLE FLYE': {
    youtubeId: 'kZJZWtfNpVI',
    title: 'Cable Flye',
    tips: [
      'Keep slight bend in elbows',
      'Focus on chest squeeze',
      'Control the eccentric phase',
      'Feel stretch at bottom position'
    ]
  },
  'DUMBBELL FLY': {
    youtubeId: 'kZJZWtfNpVI',
    title: 'Dumbbell Fly',
    tips: [
      'Maintain chest arch',
      'Keep slight elbow bend',
      'Lower until stretch in chest',
      'Squeeze chest muscles at top'
    ]
  },
  
  // ======= PUSH-UP VARIATIONS =======
  'PUSH-UP': {
    youtubeId: 'IODxDxX7oi4',
    title: 'Push-ups',
    tips: [
      'Maintain straight line from head to heels',
      'Lower chest to ground',
      'Keep core engaged',
      'Press up explosively'
    ]
  },
  'PUSHUP': {
    youtubeId: 'IODxDxX7oi4',
    title: 'Push-ups',
    tips: [
      'Maintain straight line from head to heels',
      'Lower chest to ground',
      'Keep core engaged',
      'Press up explosively'
    ]
  },
  'PUSHUPS': {
    youtubeId: 'IODxDxX7oi4',
    title: 'Push-ups',
    tips: [
      'Maintain straight line from head to heels',
      'Lower chest to ground',
      'Keep core engaged',
      'Press up explosively'
    ]
  },
  'DIAMOND PUSHUP': {
    youtubeId: 'J0DnG1_S92I',
    title: 'Diamond Push-ups',
    tips: [
      'Form diamond shape with hands',
      'Keep elbows close to body',
      'Lower chest to hands',
      'Focus on tricep engagement'
    ]
  },
  'DIAMOND PUSHUPS': {
    youtubeId: 'J0DnG1_S92I',
    title: 'Diamond Push-ups',
    tips: [
      'Form diamond shape with hands',
      'Keep elbows close to body',
      'Lower chest to hands',
      'Focus on tricep engagement'
    ]
  },
  'PIKE PUSH UP': {
    youtubeId: 'x1jRwpJHFNg',
    title: 'Pike Push Up',
    tips: [
      'Start in downward dog position',
      'Lower head toward ground',
      'Press back to start position',
      'Great for shoulder development'
    ]
  },
  'PIKE PUSHUP': {
    youtubeId: 'x1jRwpJHFNg',
    title: 'Pike Push Up',
    tips: [
      'Form inverted V with body',
      'Lower head between hands',
      'Focus on shoulder strength',
      'Keep legs relatively straight'
    ]
  },

  // ======= SQUAT VARIATIONS =======
  'FRONT SQUAT': {
    youtubeId: 'uYumuL_G_V0',
    title: 'Front Squat',
    tips: [
      'Keep elbows high and chest up',
      'Cross arms or use clean grip',
      'Descend with knees out',
      'Drive up through heels'
    ]
  },
  'HACK SQUAT': {
    youtubeId: 'EdtaJRBqEYI',
    title: 'Hack Squat',
    tips: [
      'Place feet shoulder-width on platform',
      'Lower with control to 90 degrees',
      'Drive through heels to return',
      'Keep back against pad'
    ]
  },
  'BULGARIAN SPLIT SQUAT': {
    youtubeId: '2C-uNgKwPLE',
    title: 'Bulgarian Split Squat',
    tips: [
      'Rear foot elevated on bench',
      'Most weight on front leg',
      'Descend straight down',
      'Drive through front heel'
    ]
  },

  // ======= DEADLIFT VARIATIONS =======
  'STIFF LEG DEADLIFT': {
    youtubeId: 'JCXUYuzwNrM',
    title: 'Stiff Leg Deadlift',
    tips: [
      'Keep legs relatively straight',
      'Hinge at hips',
      'Feel stretch in hamstrings',
      'Control the descent'
    ]
  },
  'BARBELL RDL': {
    youtubeId: 'JCXUYuzwNrM',
    title: 'Romanian Deadlift',
    tips: [
      'Start from top position',
      'Hinge at hips, not knees',
      'Lower until stretch in hamstrings',
      'Drive hips forward to return'
    ]
  },
  'ROMANIAN DEADLIFT': {
    youtubeId: 'JCXUYuzwNrM',
    title: 'Romanian Deadlift',
    tips: [
      'Start from top position',
      'Hinge at hips, not knees',
      'Lower until stretch in hamstrings',
      'Drive hips forward to return'
    ]
  },

  // ======= PULL EXERCISES =======
  'PULL-UP': {
    youtubeId: 'eGo4IYlbE5g',
    title: 'Pull-ups',
    tips: [
      'Start from dead hang',
      'Pull chest to bar',
      'Control the descent',
      'Keep core engaged'
    ]
  },
  'PULLUP': {
    youtubeId: 'eGo4IYlbE5g',
    title: 'Pull-ups',
    tips: [
      'Start from dead hang',
      'Pull chest to bar',
      'Control the descent',
      'Keep core engaged'
    ]
  },
  'BAND ASSISTED PULLUP': {
    youtubeId: 'eGo4IYlbE5g',
    title: 'Band Assisted Pull-up',
    tips: [
      'Use resistance band for assistance',
      'Focus on proper form',
      'Full range of motion',
      'Gradually reduce assistance'
    ]
  },
  'BAND ASSISTED PULL-UP': {
    youtubeId: 'eGo4IYlbE5g',
    title: 'Band Assisted Pull-up',
    tips: [
      'Band helps with the hardest part',
      'Still focus on pulling strength',
      'Full dead hang to chest to bar',
      'Progress to unassisted'
    ]
  },
  'CHIN-UP': {
    youtubeId: 'brhRXlOhkAM',
    title: 'Chin-ups',
    tips: [
      'Use underhand grip',
      'Pull chin over bar',
      'Squeeze biceps at top',
      'Lower with control'
    ]
  },
  'CHINUP': {
    youtubeId: 'brhRXlOhkAM',
    title: 'Chin-ups',
    tips: [
      'Supinated (underhand) grip',
      'Focus on bicep engagement',
      'Full range of motion',
      'Control the negative'
    ]
  },
  'TOWEL CHIN UP': {
    youtubeId: 'brhRXlOhkAM',
    title: 'Towel Chin Up',
    tips: [
      'Grip towel instead of bar',
      'Challenges grip strength significantly',
      'Same pulling mechanics',
      'Advanced variation for grip'
    ]
  },
  'TOWEL CHIN UPS': {
    youtubeId: 'brhRXlOhkAM',
    title: 'Towel Chin Ups',
    tips: [
      'Excellent for grip strength',
      'Hang towel over pull-up bar',
      'Grip towel ends and pull up',
      'Very challenging variation'
    ]
  },
  'NEUTRAL-GRIP PULLDOWN': {
    youtubeId: 'CAwf7n6Luuc',
    title: 'Neutral-Grip Pulldown',
    tips: [
      'Use neutral grip attachment',
      'Pull to upper chest',
      'Squeeze shoulder blades',
      'More bicep friendly than wide grip'
    ]
  },
  'WIDE-GRIP LAT PULLDOWN': {
    youtubeId: 'CAwf7n6Luuc',
    title: 'Wide-Grip Lat Pulldown',
    tips: [
      'Grip wider than shoulders',
      'Pull to upper chest',
      'Focus on lat activation',
      'Control the weight up'
    ]
  },
  'SUPINATED PULLDOWN': {
    youtubeId: 'CAwf7n6Luuc',
    title: 'Supinated Pulldown',
    tips: [
      'Use underhand grip',
      'Pull to lower chest',
      'Involves more biceps',
      'Squeeze lats at bottom'
    ]
  },
  'LAT PULLDOWN': {
    youtubeId: 'CAwf7n6Luuc',
    title: 'Lat Pulldown',
    tips: [
      'Lean back slightly',
      'Pull to upper chest',
      'Squeeze shoulder blades',
      'Control the weight up'
    ]
  },

  // ======= ROW EXERCISES =======
  'INVERTED ROW': {
    youtubeId: 'hXTc1mDnZCw',
    title: 'Inverted Row',
    tips: [
      'Keep body straight',
      'Pull chest to bar',
      'Squeeze shoulder blades',
      'Lower with control'
    ]
  },
  'BODYWEIGHT ROW': {
    youtubeId: 'hXTc1mDnZCw',
    title: 'Bodyweight Row',
    tips: [
      'Same as inverted row',
      'Adjust difficulty with body angle',
      'Focus on horizontal pulling',
      'Great for beginners'
    ]
  },
  'BODYWEIGHT ROWS': {
    youtubeId: 'hXTc1mDnZCw',
    title: 'Bodyweight Rows',
    tips: [
      'Excellent pulling exercise',
      'Can be done with TRX or bar',
      'Full body stays rigid',
      'Pull chest to contact point'
    ]
  },
  'BAND ASSISTED ROW': {
    youtubeId: 'hXTc1mDnZCw',
    title: 'Band Assisted Row',
    tips: [
      'Use band to assist pulling motion',
      'Focus on form over resistance',
      'Great for beginners',
      'Progress to unassisted'
    ]
  },
  'BAND ASSISTED ROWS': {
    youtubeId: 'hXTc1mDnZCw',
    title: 'Band Assisted Rows',
    tips: [
      'Band provides assistance',
      'Learn proper rowing pattern',
      'Maintain straight body line',
      'Progress gradually'
    ]
  },
  'BENT OVER DUMBBELL ROW': {
    youtubeId: 'roCP6wCXPqo',
    title: 'Bent Over Dumbbell Row',
    tips: [
      'Hinge at hips, chest up',
      'Pull dumbbell to hip',
      'Squeeze shoulder blade',
      'Control the descent'
    ]
  },
  'BENT-OVER DUMBBELL ROW': {
    youtubeId: 'roCP6wCXPqo',
    title: 'Bent-Over Dumbbell Row',
    tips: [
      'Support yourself with one hand',
      'Pull to lower rib area',
      'Focus on lat and rhomboid',
      'Keep core stable'
    ]
  },
  'DUMBBELL ROW': {
    youtubeId: 'roCP6wCXPqo',
    title: 'Dumbbell Row',
    tips: [
      'Support yourself with one hand',
      'Pull dumbbell to hip',
      'Squeeze shoulder blade',
      'Keep core stable'
    ]
  },
  'SEATED CABLE ROW': {
    youtubeId: 'xQNrFHEMhI4',
    title: 'Seated Cable Row',
    tips: [
      'Sit tall with chest out',
      'Pull handle to lower chest',
      'Squeeze shoulder blades together',
      'Keep shoulders down'
    ]
  },
  'CABLE ROW': {
    youtubeId: 'xQNrFHEMhI4',
    title: 'Cable Row',
    tips: [
      'Maintain upright posture',
      'Pull to lower chest/upper abdomen',
      'Focus on squeezing shoulder blades',
      'Control the eccentric'
    ]
  },
  'MACHINE CHEST-SUPPORTED T-BAR ROW/RETRACTION': {
    youtubeId: 'j3Igk5nyZE4',
    title: 'T-Bar Row',
    tips: [
      'Chest supported for isolation',
      'Pull handle to lower chest',
      'Focus on scapular retraction',
      'Squeeze at the top'
    ]
  },
  'T-BAR ROW': {
    youtubeId: 'j3Igk5nyZE4',
    title: 'T-Bar Row',
    tips: [
      'Hinge at hips with chest up',
      'Pull weight to lower chest',
      'Squeeze shoulder blades',
      'Control the weight down'
    ]
  },
  'SEATED FACE PULL': {
    youtubeId: 'rep-qVOkqgk',
    title: 'Face Pull',
    tips: [
      'Pull rope to face level',
      'Separate hands at face',
      'Focus on rear delt activation',
      'Squeeze shoulder blades'
    ]
  },
  'FACE PULL': {
    youtubeId: 'rep-qVOkqgk',
    title: 'Face Pull',
    tips: [
      'Use rope attachment',
      'Pull to face with high elbows',
      'Great for rear delts',
      'Helps with posture'
    ]
  },

  // ======= SHOULDER EXERCISES =======
  'MILITARY PRESS': {
    youtubeId: 'k4WoLZbonns',
    title: 'Military Press',
    tips: [
      'Start bar at shoulder level',
      'Press straight overhead',
      'Keep core tight',
      'Lower with control'
    ]
  },
  'OVERHEAD PRESS': {
    youtubeId: 'k4WoLZbonns',
    title: 'Overhead Press',
    tips: [
      'Start from front rack position',
      'Press bar straight up',
      'Keep core braced',
      'Full lockout overhead'
    ]
  },
  'SEATED DUMBBELL PRESS': {
    youtubeId: 'qEwKCR5JCog',
    title: 'Seated Dumbbell Press',
    tips: [
      'Sit with back support',
      'Start at shoulder height',
      'Press dumbbells overhead',
      'Lower to ear level'
    ]
  },
  'DUMBBELL SHOULDER PRESS': {
    youtubeId: 'qEwKCR5JCog',
    title: 'Dumbbell Shoulder Press',
    tips: [
      'Start at shoulder height',
      'Press dumbbells overhead',
      'Keep core engaged',
      'Lower to starting position'
    ]
  },
  'LANDMINE PRESS': {
    youtubeId: 'kzv8g_QJhC8',
    title: 'Landmine Press',
    tips: [
      'Hold end of barbell in landmine',
      'Press up and forward',
      'Great for shoulder health',
      'Unilateral training option'
    ]
  },
  'DUMBBELL LATERAL RAISE': {
    youtubeId: '3VcKaXpzqRo',
    title: 'Dumbbell Lateral Raise',
    tips: [
      'Start with arms at sides',
      'Raise to shoulder height',
      'Lead with pinkies',
      'Control the descent'
    ]
  },
  'LATERAL RAISE': {
    youtubeId: '3VcKaXpzqRo',
    title: 'Lateral Raise',
    tips: [
      'Start with arms at sides',
      'Raise to shoulder height',
      'Focus on side delts',
      'Control the eccentric'
    ]
  },
  'REVERSE PEC DECK': {
    youtubeId: 'rep-qVOkqgk',
    title: 'Reverse Pec Deck',
    tips: [
      'Sit facing the pad',
      'Pull handles back with arms extended',
      'Focus on rear delt squeeze',
      'Control the return'
    ]
  },
  'PRONE TRAP RAISE': {
    youtubeId: 'rep-qVOkqgk',
    title: 'Prone Trap Raise',
    tips: [
      'Lie face down on incline bench',
      'Raise arms in Y formation',
      'Focus on upper trap activation',
      'Light weight, high reps'
    ]
  },

  // ======= ARM EXERCISES =======
  'BARBELL FLOOR SKULL CRUSHER': {
    youtubeId: 'AYW6GwsZIXM',
    title: 'Floor Skull Crusher',
    tips: [
      'Lie on floor for safety',
      'Keep elbows stationary',
      'Lower to forehead level',
      'Press back up'
    ]
  },
  'DUMBBELL FLOOR SKULL CRUSHER': {
    youtubeId: 'AYW6GwsZIXM',
    title: 'Dumbbell Floor Skull Crusher',
    tips: [
      'Use dumbbells instead of barbell',
      'Same motion as barbell version',
      'Floor provides safety',
      'Focus on tricep isolation'
    ]
  },
  'SKULL CRUSHER': {
    youtubeId: 'AYW6GwsZIXM',
    title: 'Skull Crusher',
    tips: [
      'Keep elbows stationary',
      'Lower weight to forehead',
      'Press back to start',
      'Focus on tricep squeeze'
    ]
  },
  'OVERHEAD TRICEP EXTENSION': {
    youtubeId: '_gsUck-7M74',
    title: 'Overhead Tricep Extension',
    tips: [
      'Keep elbows close to head',
      'Lower weight behind head',
      'Press back to start',
      'Feel stretch in triceps'
    ]
  },
  'OVERHEAD TRICEP EXTENSIONS': {
    youtubeId: '_gsUck-7M74',
    title: 'Overhead Tricep Extensions',
    tips: [
      'Can use dumbbell or cable',
      'Keep elbows stationary',
      'Full range of motion',
      'Focus on the stretch'
    ]
  },
  'V-BAR PRESSDOWN': {
    youtubeId: 'yyFh5xWWNY4',
    title: 'V-Bar Pressdown',
    tips: [
      'Use V-bar attachment',
      'Keep elbows at sides',
      'Press down to full extension',
      'Control the weight up'
    ]
  },
  'TRICEP PUSHDOWN': {
    youtubeId: 'yyFh5xWWNY4',
    title: 'Tricep Pushdown',
    tips: [
      'Keep elbows tucked at sides',
      'Press down to full extension',
      'Squeeze triceps at bottom',
      'Control the eccentric'
    ]
  },
  'HAMMER CURL': {
    youtubeId: 'zC3nLlEvin4',
    title: 'Hammer Curl',
    tips: [
      'Keep neutral wrist position',
      'Curl up with control',
      'Squeeze at the top',
      'Lower slowly'
    ]
  },
  'BAND HAMMER CURL': {
    youtubeId: 'zC3nLlEvin4',
    title: 'Band Hammer Curl',
    tips: [
      'Use resistance band',
      'Same neutral grip position',
      'Control the resistance',
      'Great for home workouts'
    ]
  },
  'BAND HAMMER CURLS': {
    youtubeId: 'zC3nLlEvin4',
    title: 'Band Hammer Curls',
    tips: [
      'Resistance band provides constant tension',
      'Maintain neutral wrist',
      'Focus on bicep and forearm',
      'Adjust tension as needed'
    ]
  },
  'CROSS BODY HAMMER CURL': {
    youtubeId: 'zC3nLlEvin4',
    title: 'Cross Body Hammer Curl',
    tips: [
      'Curl across body to opposite shoulder',
      'Neutral grip throughout',
      'Targets brachialis more',
      'Alternate arms'
    ]
  },
  'CROSS BODY HAMMER CURLS': {
    youtubeId: 'zC3nLlEvin4',
    title: 'Cross Body Hammer Curls',
    tips: [
      'Curl dumbbell across to opposite pec',
      'Great brachialis activation',
      'Control the movement',
      'Focus on squeeze'
    ]
  },
  'EZ BAR CURL': {
    youtubeId: 'av7-8igSXTs',
    title: 'EZ Bar Curl',
    tips: [
      'Use EZ bar for wrist comfort',
      'Keep elbows at sides',
      'Curl with control',
      'Squeeze biceps at top'
    ]
  },
  'BARBELL CURL': {
    youtubeId: 'av7-8igSXTs',
    title: 'Barbell Curl',
    tips: [
      'Keep elbows at sides',
      'Curl with supinated grip',
      'Squeeze biceps at top',
      'Lower with control'
    ]
  },
  'DIP': {
    youtubeId: '2z8JmcrW-As',
    title: 'Dips',
    tips: [
      'Lean forward slightly',
      'Lower until stretch in chest',
      'Press back up',
      'Keep shoulders down'
    ]
  },
  'DIPS': {
    youtubeId: '2z8JmcrW-As',
    title: 'Dips',
    tips: [
      'Great for triceps and chest',
      'Control the descent',
      'Full range of motion',
      'Add weight when ready'
    ]
  },

  // ======= LEG EXERCISES =======
  'LEG PRESS': {
    youtubeId: 'IZxyjW7MPJQ',
    title: 'Leg Press',
    tips: [
      'Place feet shoulder-width apart',
      'Lower until 90-degree knee angle',
      'Press through heels',
      'Don\'t lock knees completely'
    ]
  },
  'LEG EXTENSION': {
    youtubeId: 'YyvSfVjQeL0',
    title: 'Leg Extension',
    tips: [
      'Adjust seat for proper alignment',
      'Extend legs fully',
      'Squeeze quads at top',
      'Lower with control'
    ]
  },
  'LYING LEG CURL': {
    youtubeId: '1Tq3QdYUuHs',
    title: 'Lying Leg Curl',
    tips: [
      'Lie face down on machine',
      'Curl heels to glutes',
      'Squeeze hamstrings',
      'Lower slowly'
    ]
  },
  'ECCENTRIC-ACCENTUATED LYING LEG CURL': {
    youtubeId: '1Tq3QdYUuHs',
    title: 'Eccentric Lying Leg Curl',
    tips: [
      'Focus on slow negative phase',
      'Take 3-4 seconds to lower',
      'Normal speed concentric',
      'Increased muscle tension'
    ]
  },
  'SEATED LEG CURL': {
    youtubeId: 'mNfK5wBLU2w',
    title: 'Seated Leg Curl',
    tips: [
      'Adjust seat and pad position',
      'Curl heels under the seat',
      'Better hamstring activation than lying',
      'Control the weight back up'
    ]
  },
  'DUMBBELL WALKING LUNGE': {
    youtubeId: 'QOVaHwm-Q6U',
    title: 'Walking Lunge',
    tips: [
      'Hold dumbbells at sides',
      'Step forward into lunge',
      'Alternate legs with each step',
      'Keep torso upright'
    ]
  },
  'WALKING LUNGE': {
    youtubeId: 'QOVaHwm-Q6U',
    title: 'Walking Lunge',
    tips: [
      'Step forward into lunge',
      'Alternate legs with each step',
      'Keep torso upright',
      'Push through front heel'
    ]
  },
  'LUNGE': {
    youtubeId: 'QOVaHwm-Q6U',
    title: 'Lunge',
    tips: [
      'Step forward into lunge',
      'Lower back knee toward ground',
      'Push through front heel',
      'Maintain upright torso'
    ]
  },
  'BARBELL HIP THRUST': {
    youtubeId: 'xDmFkJxPzeM',
    title: 'Barbell Hip Thrust',
    tips: [
      'Upper back on bench',
      'Drive hips up and forward',
      'Squeeze glutes at top',
      'Lower with control'
    ]
  },
  'HIP THRUST': {
    youtubeId: 'xDmFkJxPzeM',
    title: 'Hip Thrust',
    tips: [
      'Upper back on bench',
      'Drive hips up and forward',
      'Squeeze glutes at top',
      'Keep core engaged'
    ]
  },
  'REVERSE HYPEREXTENSION': {
    youtubeId: 'ZeRsNzFcQLQ',
    title: 'Reverse Hyperextension',
    tips: [
      'Lie face down on bench',
      'Lift legs behind you',
      'Focus on glute and hamstring',
      'Control the movement'
    ]
  },
  'STANDING CALF RAISE': {
    youtubeId: 'gwLzBJYoWlI',
    title: 'Standing Calf Raise',
    tips: [
      'Stand on platform or step',
      'Rise up on balls of feet',
      'Get full range of motion',
      'Squeeze at the top'
    ]
  },
  'CALF RAISE': {
    youtubeId: 'gwLzBJYoWlI',
    title: 'Calf Raise',
    tips: [
      'Rise up on balls of feet',
      'Squeeze calves at top',
      'Lower slowly for stretch',
      'Keep movement controlled'
    ]
  },

  // ======= KETTLEBELL EXERCISES =======
  'KETTLEBELL SWING': {
    youtubeId: 'YSxHifyI6s8',
    title: 'Kettlebell Swing',
    tips: [
      'Hinge at hips, not knees',
      'Drive hips forward explosively',
      'Keep arms relaxed',
      'Swing to shoulder height'
    ]
  },
  'KB SWING': {
    youtubeId: 'YSxHifyI6s8',
    title: 'KB Swing',
    tips: [
      'Hip hinge movement pattern',
      'Explosive hip extension',
      'Great for posterior chain',
      'Maintain neutral spine'
    ]
  },

  // ======= DEFAULT FALLBACK =======
  'DEFAULT': {
    youtubeId: 'vqQ9ok0dEgk',
    title: 'Exercise Form',
    tips: [
      'Focus on proper form over weight',
      'Control the movement',
      'Breathe properly throughout',
      'Listen to your body'
    ]
  }
};

export default formVideosDatabase;