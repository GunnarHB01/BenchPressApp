// Complete Jeff Nippard Bench Press Program data structure
// This represents the full 8-week program with all days and exercises

export interface Exercise {
  name: string;
  sets: number;
  reps: number | string;
  percentage?: number;
  rpe?: number;
  rest: string;
  notes?: string;
}

export interface WorkoutDay {
  type: string;
  totalSetVolume: number;
  exercises: Exercise[];
}

export interface ProgramWeek {
  days: WorkoutDay[];
}

export interface ProgramData {
  [key: string]: ProgramWeek;
}

const completeProgram: ProgramData = {
  week1: {
    days: [
      {
        type: "UPPER BODY #1",
        totalSetVolume: 18,
        exercises: [
          {
            name: "BARBELL BENCH PRESS",
            sets: 4,
            reps: 6,
            percentage: 72.5,
            rest: "3-5MIN",
            notes: "45° ELBOW TUCK"
          },
          {
            name: "PULL-UP",
            sets: 3,
            reps: 8,
            rpe: 8,
            rest: "2-3MIN",
            notes: "PULL YOUR SHOULDERS DOWN AND IN"
          },
          {
            name: "ECCENTRIC-ACCENTUATED BARBELL INCLINE PRESS",
            sets: 2,
            reps: 8,
            rpe: 8,
            rest: "2-3MIN",
            notes: "2-SECOND LOWERING PHASE. ELBOWS TUCKED ~30°"
          },
          {
            name: "INVERTED ROW",
            sets: 3,
            reps: 10,
            rpe: 8,
            rest: "2-3MIN",
            notes: "SCAPULAE BACK AND DOWN. PULL WITH YOUR ELBOWS OUT"
          },
          {
            name: "DIP",
            sets: 2,
            reps: 10,
            rpe: 7,
            rest: "1-2MIN",
            notes: "KEEP YOUR SCAPULAE RETRACTED AND DEPRESSED"
          },
          {
            name: "BARBELL FLOOR SKULL CRUSHER",
            sets: 2,
            reps: 8,
            rpe: 7,
            rest: "1-2MIN",
            notes: "KEEP YOUR ELBOWS OVER YOUR HEAD. KEEP YOUR SHOULDER JOINT MOTIONLESS"
          },
          {
            name: "HAMMER CURL",
            sets: 2,
            reps: 10,
            rpe: 8,
            rest: "1-2MIN",
            notes: "CURL THE WEIGHT \"OUT\", NOT \"UP\""
          }
        ]
      },
      {
        type: "LOWER BODY #1",
        totalSetVolume: 15,
        exercises: [
          {
            name: "BACK SQUAT",
            sets: 3,
            reps: 5,
            percentage: 75,
            rest: "3-4MIN",
            notes: "SIT DOWN AND BACK"
          },
          {
            name: "STIFF LEG DEADLIFT",
            sets: 3,
            reps: 10,
            rpe: 8,
            rest: "2-3MIN",
            notes: "KEEP YOUR HIPS HIGH"
          },
          {
            name: "BARBELL HIP THRUST",
            sets: 3,
            reps: 15,
            rpe: 7,
            rest: "2-3MIN",
            notes: "USE A PAD. RIB CAGE AND CHIN TUCKED DOWN"
          },
          {
            name: "LYING LEG CURL",
            sets: 3,
            reps: 20,
            rpe: 8,
            rest: "0MIN",
            notes: "FOCUS ON SQUEEZING YOUR HAMSTRINGS TO MOVE THE WEIGHT"
          },
          {
            name: "LEG EXTENSION",
            sets: 3,
            reps: 20,
            rpe: 8,
            rest: "1-2MIN",
            notes: "FOCUS ON SQUEEZING YOUR QUADS TO MOVE THE WEIGHT"
          }
        ]
      },
      {
        type: "UPPER BODY #2",
        totalSetVolume: 22,
        exercises: [
          {
            name: "BARBELL BENCH PRESS",
            sets: 5,
            reps: 3,
            percentage: 80,
            rest: "3-5MIN",
            notes: "45° ELBOW TUCK"
          },
          {
            name: "NEUTRAL-GRIP PULLDOWN",
            sets: 4,
            reps: 6,
            rpe: 8,
            rest: "2-3MIN",
            notes: "PULL YOUR SHOULDERS DOWN AGAINST YOUR SIDES"
          },
          {
            name: "BARBELL PIN PRESS",
            sets: 2,
            reps: 8,
            rpe: 7,
            rest: "2-3MIN",
            notes: "START WITH THE BAR ON THE PINS. FOCUS ON SPEED OFF OF THE CHEST"
          },
          {
            name: "SEATED FACE PULL",
            sets: 3,
            reps: 15,
            rpe: 8,
            rest: "1-2MIN",
            notes: "PULL YOUR ELBOWS UP AND BACK. FOCUS ON SCAPULAR RETRACTION"
          },
          {
            name: "MILITARY PRESS",
            sets: 2,
            reps: 6,
            rpe: 7,
            rest: "2-3MIN",
            notes: "RESET THE BAR AFTER EACH REP. THINK ABOUT DOING A \"DEAD PRESS\". SQUEEZE YOUR GLUTES TO KEEP YOUR TORSO UPRIGHT"
          },
          {
            name: "DUMBBELL LATERAL RAISE",
            sets: 3,
            reps: 12,
            rpe: 8,
            rest: "1-2MIN",
            notes: "FOCUS ON SQUEEZING YOUR DELTOIDS TO MOVE THE WEIGHT"
          },
          {
            name: "REVERSE PEC DECK",
            sets: 3,
            reps: 15,
            rpe: 8,
            rest: "1-2MIN",
            notes: "TAKE YOUR SCAPULAE THROUGH A ROM"
          }
        ]
      },
      {
        type: "LOWER BODY #2",
        totalSetVolume: 16,
        exercises: [
          {
            name: "DEADLIFT",
            sets: 4,
            reps: 6,
            percentage: 70,
            rest: "3-4MIN",
            notes: "FOCUS ON KEEPING YOUR SPINE NEUTRAL"
          },
          {
            name: "FRONT SQUAT",
            sets: 3,
            reps: 10,
            rpe: 7,
            rest: "2-3MIN",
            notes: "FOCUS ON KEEPING YOUR TORSO UPRIGHT"
          },
          {
            name: "LEG PRESS",
            sets: 3,
            reps: 12,
            rpe: 7,
            rest: "1-2MIN",
            notes: "FOCUS ON SQUEEZING YOUR QUADS TO MOVE THE WEIGHT"
          },
          {
            name: "ECCENTRIC-ACCENTUATED LYING LEG CURL",
            sets: 3,
            reps: 10,
            rpe: 8,
            rest: "1-2MIN",
            notes: "3-SECOND LOWERING PHASE"
          },
          {
            name: "STANDING CALF RAISE",
            sets: 3,
            reps: 12,
            rpe: 8,
            rest: "1-2MIN",
            notes: "PRESS ALL THE WAY UP TO YOUR TOES, GET A STRETCH AT THE BOTTOM. DON'T BOUNCE"
          }
        ]
      },
      {
        type: "UPPER BODY #3",
        totalSetVolume: 21,
        exercises: [
          {
            name: "PAUSE BARBELL BENCH PRESS",
            sets: 5,
            reps: 5,
            percentage: 67.5,
            rest: "3-5MIN",
            notes: "3-SECOND PAUSE. FOCUS ON SPEED OFF THE CHEST"
          },
          {
            name: "SUPINATED PULLDOWN",
            sets: 3,
            reps: 12,
            rpe: 8,
            rest: "2-3MIN",
            notes: "PULL YOUR SHOULDERS DOWN AGAINST YOUR SIDES"
          },
          {
            name: "DUMBBELL INCLINE PRESS",
            sets: 2,
            reps: 12,
            rpe: 7,
            rest: "2-3MIN",
            notes: "FOCUS ON PRESSING EVENLY. 30° ELBOW TUCK"
          },
          {
            name: "MACHINE CHEST-SUPPORTED T-BAR ROW/RETRACTION",
            sets: 3,
            reps: "10/10",
            rpe: 8,
            rest: "1-2MIN",
            notes: "FIRST 10 REPS RETRACT YOUR SCAPULAE AND PULL YOUR ELBOWS OUT, LAST 10 REPS ONLY GO THROUGH A SCAPULAR ROM (YOUR ARMS DON'T MOVE)"
          },
          {
            name: "CABLE FLYE",
            sets: 3,
            reps: 15,
            rpe: 7,
            rest: "1-2MIN",
            notes: "KEEP YOUR SCAPULAE RETRACTED AND DEPRESSED"
          },
          {
            name: "V-BAR PRESSDOWN",
            sets: 2,
            reps: 15,
            rpe: 7,
            rest: "1-2MIN",
            notes: "KEEP YOUR SHOULDER AND ELBOW LOCKED IN PLACE"
          },
          {
            name: "PRONE TRAP RAISE",
            sets: 3,
            reps: 15,
            rpe: 8,
            rest: "1-2MIN",
            notes: "FOCUS ON SQUEEZING YOUR UPPER BACK TO MOVE THE WEIGHT"
          }
        ]
      }
    ]
  },
  week2: {
    days: [
      {
        type: "UPPER BODY #1",
        totalSetVolume: 18,
        exercises: [
          {
            name: "BARBELL BENCH PRESS",
            sets: 4,
            reps: 6,
            percentage: 75,
            rest: "3-5MIN",
            notes: "45° ELBOW TUCK"
          },
          {
            name: "PULL-UP",
            sets: 3,
            reps: 8,
            rpe: 8,
            rest: "2-3MIN",
            notes: "PULL YOUR SHOULDERS DOWN AND IN"
          },
          {
            name: "ECCENTRIC-ACCENTUATED BARBELL INCLINE PRESS",
            sets: 2,
            reps: 8,
            rpe: 8,
            rest: "2-3MIN",
            notes: "2-SECOND LOWERING PHASE. ELBOWS TUCKED ~30°"
          },
          {
            name: "INVERTED ROW",
            sets: 3,
            reps: 10,
            rpe: 8,
            rest: "2-3MIN",
            notes: "SCAPULAE BACK AND DOWN. PULL WITH YOUR ELBOWS OUT"
          },
          {
            name: "DIP",
            sets: 2,
            reps: 10,
            rpe: 7,
            rest: "1-2MIN",
            notes: "KEEP YOUR SCAPULAE RETRACTED AND DEPRESSED"
          },
          {
            name: "BARBELL FLOOR SKULL CRUSHER",
            sets: 2,
            reps: 8,
            rpe: 7,
            rest: "1-2MIN",
            notes: "KEEP YOUR ELBOWS OVER YOUR HEAD. KEEP YOUR SHOULDER JOINT MOTIONLESS"
          },
          {
            name: "HAMMER CURL",
            sets: 2,
            reps: 10,
            rpe: 8,
            rest: "1-2MIN",
            notes: "CURL THE WEIGHT \"OUT\", NOT \"UP\""
          }
        ]
      },
      {
        type: "LOWER BODY #1",
        totalSetVolume: 15,
        exercises: [
          {
            name: "BACK SQUAT",
            sets: 3,
            reps: 5,
            percentage: 75,
            rest: "3-4MIN",
            notes: "SIT DOWN AND BACK"
          },
          {
            name: "STIFF LEG DEADLIFT",
            sets: 3,
            reps: 10,
            rpe: 8,
            rest: "2-3MIN",
            notes: "KEEP YOUR HIPS HIGH"
          },
          {
            name: "BARBELL HIP THRUST",
            sets: 3,
            reps: 15,
            rpe: 7,
            rest: "2-3MIN",
            notes: "USE A PAD. RIB CAGE AND CHIN TUCKED DOWN"
          },
          {
            name: "LYING LEG CURL",
            sets: 3,
            reps: 20,
            rpe: 8,
            rest: "0MIN",
            notes: "FOCUS ON SQUEEZING YOUR HAMSTRINGS TO MOVE THE WEIGHT"
          },
          {
            name: "LEG EXTENSION",
            sets: 3,
            reps: 20,
            rpe: 8,
            rest: "1-2MIN",
            notes: "FOCUS ON SQUEEZING YOUR QUADS TO MOVE THE WEIGHT"
          }
        ]
      },
      {
        type: "UPPER BODY #2",
        totalSetVolume: 22,
        exercises: [
          {
            name: "BARBELL BENCH PRESS",
            sets: 5,
            reps: 3,
            percentage: 85,
            rest: "3-5MIN",
            notes: "45° ELBOW TUCK"
          },
          {
            name: "NEUTRAL-GRIP PULLDOWN",
            sets: 4,
            reps: 6,
            rpe: 8,
            rest: "2-3MIN",
            notes: "PULL YOUR SHOULDERS DOWN AGAINST YOUR SIDES"
          },
          {
            name: "BARBELL PIN PRESS",
            sets: 2,
            reps: 8,
            rpe: 7,
            rest: "2-3MIN",
            notes: "START WITH THE BAR ON THE PINS. FOCUS ON SPEED OFF OF THE CHEST"
          },
          {
            name: "SEATED FACE PULL",
            sets: 3,
            reps: 15,
            rpe: 8,
            rest: "1-2MIN",
            notes: "PULL YOUR ELBOWS UP AND BACK. FOCUS ON SCAPULAR RETRACTION"
          },
          {
            name: "MILITARY PRESS",
            sets: 2,
            reps: 6,
            rpe: 7,
            rest: "2-3MIN",
            notes: "RESET THE BAR AFTER EACH REP. THINK ABOUT DOING A \"DEAD PRESS\". SQUEEZE YOUR GLUTES TO KEEP YOUR TORSO UPRIGHT"
          },
          {
            name: "DUMBBELL LATERAL RAISE",
            sets: 3,
            reps: 12,
            rpe: 8,
            rest: "1-2MIN",
            notes: "FOCUS ON SQUEEZING YOUR DELTOIDS TO MOVE THE WEIGHT"
          },
          {
            name: "REVERSE PEC DECK",
            sets: 3,
            reps: 15,
            rpe: 8,
            rest: "1-2MIN",
            notes: "TAKE YOUR SCAPULAE THROUGH A ROM"
          }
        ]
      },
      {
        type: "LOWER BODY #2",
        totalSetVolume: 16,
        exercises: [
          {
            name: "DEADLIFT",
            sets: 4,
            reps: 6,
            percentage: 70,
            rest: "3-4MIN",
            notes: "FOCUS ON KEEPING YOUR SPINE NEUTRAL"
          },
          {
            name: "FRONT SQUAT",
            sets: 3,
            reps: 10,
            rpe: 7,
            rest: "2-3MIN",
            notes: "FOCUS ON KEEPING YOUR TORSO UPRIGHT"
          },
          {
            name: "LEG PRESS",
            sets: 3,
            reps: 12,
            rpe: 7,
            rest: "1-2MIN",
            notes: "FOCUS ON SQUEEZING YOUR QUADS TO MOVE THE WEIGHT"
          },
          {
            name: "ECCENTRIC-ACCENTUATED LYING LEG CURL",
            sets: 3,
            reps: 10,
            rpe: 8,
            rest: "1-2MIN",
            notes: "3-SECOND LOWERING PHASE"
          },
          {
            name: "STANDING CALF RAISE",
            sets: 3,
            reps: 12,
            rpe: 8,
            rest: "1-2MIN",
            notes: "PRESS ALL THE WAY UP TO YOUR TOES, GET A STRETCH AT THE BOTTOM. DON'T BOUNCE"
          }
        ]
      },
      {
        type: "UPPER BODY #3",
        totalSetVolume: 21,
        exercises: [
          {
            name: "PAUSE BARBELL BENCH PRESS",
            sets: 5,
            reps: 5,
            percentage: 70,
            rest: "3-5MIN",
            notes: "3-SECOND PAUSE. FOCUS ON SPEED OFF THE CHEST"
          },
          {
            name: "SUPINATED PULLDOWN",
            sets: 3,
            reps: 12,
            rpe: 8,
            rest: "2-3MIN",
            notes: "PULL YOUR SHOULDERS DOWN AGAINST YOUR SIDES"
          },
          {
            name: "DUMBBELL INCLINE PRESS",
            sets: 2,
            reps: 12,
            rpe: 7,
            rest: "2-3MIN",
            notes: "FOCUS ON PRESSING EVENLY. 30° ELBOW TUCK"
          },
          {
            name: "MACHINE CHEST-SUPPORTED T-BAR ROW/RETRACTION",
            sets: 3,
            reps: "10/10",
            rpe: 8,
            rest: "1-2MIN",
            notes: "FIRST 10 REPS RETRACT YOUR SCAPULAE AND PULL YOUR ELBOWS OUT, LAST 10 REPS ONLY GO THROUGH A SCAPULAR ROM (YOUR ARMS DON'T MOVE)"
          },
          {
            name: "CABLE FLYE",
            sets: 3,
            reps: 15,
            rpe: 7,
            rest: "1-2MIN",
            notes: "KEEP YOUR SCAPULAE RETRACTED AND DEPRESSED"
          },
          {
            name: "V-BAR PRESSDOWN",
            sets: 2,
            reps: 15,
            rpe: 7,
            rest: "1-2MIN",
            notes: "KEEP YOUR SHOULDER AND ELBOW LOCKED IN PLACE"
          },
          {
            name: "PRONE TRAP RAISE",
            sets: 3,
            reps: 15,
            rpe: 8,
            rest: "1-2MIN",
            notes: "FOCUS ON SQUEEZING YOUR UPPER BACK TO MOVE THE WEIGHT"
          }
        ]
      }
    ]
  },
  week3: {
    days: [
      {
        type: "UPPER BODY #1",
        totalSetVolume: 18,
        exercises: [
          {
            name: "BARBELL BENCH PRESS",
            sets: 4,
            reps: 6,
            percentage: 82.5,
            rest: "3-5MIN",
            notes: "45° ELBOW TUCK"
          },
          {
            name: "PULL-UP",
            sets: 3,
            reps: 8,
            rpe: 8,
            rest: "2-3MIN",
            notes: "PULL YOUR SHOULDERS DOWN AND IN"
          },
          {
            name: "ECCENTRIC-ACCENTUATED BARBELL INCLINE PRESS",
            sets: 2,
            reps: 8,
            rpe: 8,
            rest: "2-3MIN",
            notes: "2-SECOND LOWERING PHASE. ELBOWS TUCKED ~30°"
          },
          {
            name: "INVERTED ROW",
            sets: 3,
            reps: 10,
            rpe: 8,
            rest: "2-3MIN",
            notes: "SCAPULAE BACK AND DOWN. PULL WITH YOUR ELBOWS OUT"
          },
          {
            name: "DIP",
            sets: 2,
            reps: 10,
            rpe: 7,
            rest: "1-2MIN",
            notes: "KEEP YOUR SCAPULAE RETRACTED AND DEPRESSED"
          },
          {
            name: "BARBELL FLOOR SKULL CRUSHER",
            sets: 2,
            reps: 8,
            rpe: 7,
            rest: "1-2MIN",
            notes: "KEEP YOUR ELBOWS OVER YOUR HEAD. KEEP YOUR SHOULDER JOINT MOTIONLESS"
          },
          {
            name: "HAMMER CURL",
            sets: 2,
            reps: 10,
            rpe: 8,
            rest: "1-2MIN",
            notes: "CURL THE WEIGHT \"OUT\", NOT \"UP\""
          }
        ]
      },
      {
        type: "LOWER BODY #1",
        totalSetVolume: 15,
        exercises: [
          {
            name: "BACK SQUAT",
            sets: 3,
            reps: 5,
            percentage: 80,
            rest: "3-4MIN",
            notes: "SIT DOWN AND BACK"
          },
          {
            name: "STIFF LEG DEADLIFT",
            sets: 3,
            reps: 10,
            rpe: 8,
            rest: "2-3MIN",
            notes: "KEEP YOUR HIPS HIGH"
          },
          {
            name: "BARBELL HIP THRUST",
            sets: 3,
            reps: 15,
            rpe: 7,
            rest: "2-3MIN",
            notes: "USE A PAD. RIB CAGE AND CHIN TUCKED DOWN"
          },
          {
            name: "LYING LEG CURL",
            sets: 3,
            reps: 20,
            rpe: 8,
            rest: "0MIN",
            notes: "FOCUS ON SQUEEZING YOUR HAMSTRINGS TO MOVE THE WEIGHT"
          },
          {
            name: "LEG EXTENSION",
            sets: 3,
            reps: 20,
            rpe: 8,
            rest: "1-2MIN",
            notes: "FOCUS ON SQUEEZING YOUR QUADS TO MOVE THE WEIGHT"
          }
        ]
      },
      {
        type: "UPPER BODY #2",
        totalSetVolume: 22,
        exercises: [
          {
            name: "BARBELL BENCH PRESS",
            sets: 5,
            reps: 3,
            percentage: 85,
            rest: "3-5MIN",
            notes: "45° ELBOW TUCK"
          },
          {
            name: "NEUTRAL-GRIP PULLDOWN",
            sets: 4,
            reps: 6,
            rpe: 8,
            rest: "2-3MIN",
            notes: "PULL YOUR SHOULDERS DOWN AGAINST YOUR SIDES"
          },
          {
            name: "BARBELL PIN PRESS",
            sets: 2,
            reps: 8,
            rpe: 7,
            rest: "2-3MIN",
            notes: "START WITH THE BAR ON THE PINS. FOCUS ON SPEED OFF OF THE CHEST"
          },
          {
            name: "SEATED FACE PULL",
            sets: 3,
            reps: 15,
            rpe: 8,
            rest: "1-2MIN",
            notes: "PULL YOUR ELBOWS UP AND BACK. FOCUS ON SCAPULAR RETRACTION"
          },
          {
            name: "MILITARY PRESS",
            sets: 2,
            reps: 6,
            rpe: 7,
            rest: "2-3MIN",
            notes: "RESET THE BAR AFTER EACH REP. THINK ABOUT DOING A \"DEAD PRESS\". SQUEEZE YOUR GLUTES TO KEEP YOUR TORSO UPRIGHT"
          },
          {
            name: "DUMBBELL LATERAL RAISE",
            sets: 3,
            reps: 12,
            rpe: 8,
            rest: "1-2MIN",
            notes: "FOCUS ON SQUEEZING YOUR DELTOIDS TO MOVE THE WEIGHT"
          },
          {
            name: "REVERSE PEC DECK",
            sets: 3,
            reps: 15,
            rpe: 8,
            rest: "1-2MIN",
            notes: "TAKE YOUR SCAPULAE THROUGH A ROM"
          }
        ]
      },
      {
        type: "LOWER BODY #2",
        totalSetVolume: 16,
        exercises: [
          {
            name: "DEADLIFT",
            sets: 4,
            reps: 6,
            percentage: 75,
            rest: "3-4MIN",
            notes: "FOCUS ON KEEPING YOUR SPINE NEUTRAL"
          },
          {
            name: "FRONT SQUAT",
            sets: 3,
            reps: 10,
            rpe: 7,
            rest: "2-3MIN",
            notes: "FOCUS ON KEEPING YOUR TORSO UPRIGHT"
          },
          {
            name: "LEG PRESS",
            sets: 3,
            reps: 12,
            rpe: 7,
            rest: "1-2MIN",
            notes: "FOCUS ON SQUEEZING YOUR QUADS TO MOVE THE WEIGHT"
          },
          {
            name: "ECCENTRIC-ACCENTUATED LYING LEG CURL",
            sets: 3,
            reps: 10,
            rpe: 8,
            rest: "1-2MIN",
            notes: "3-SECOND LOWERING PHASE"
          },
          {
            name: "STANDING CALF RAISE",
            sets: 3,
            reps: 12,
            rpe: 8,
            rest: "1-2MIN",
            notes: "PRESS ALL THE WAY UP TO YOUR TOES, GET A STRETCH AT THE BOTTOM. DON'T BOUNCE"
          }
        ]
      },
      {
        type: "UPPER BODY #3",
        totalSetVolume: 21,
        exercises: [
          {
            name: "PAUSE BARBELL BENCH PRESS",
            sets: 5,
            reps: 5,
            percentage: 72.5,
            rest: "3-5MIN",
            notes: "3-SECOND PAUSE. FOCUS ON SPEED OFF THE CHEST"
          },
          {
            name: "SUPINATED PULLDOWN",
            sets: 3,
            reps: 12,
            rpe: 8,
            rest: "2-3MIN",
            notes: "PULL YOUR SHOULDERS DOWN AGAINST YOUR SIDES"
          },
          {
            name: "DUMBBELL INCLINE PRESS",
            sets: 2,
            reps: 12,
            rpe: 7,
            rest: "2-3MIN",
            notes: "FOCUS ON PRESSING EVENLY. 30° ELBOW TUCK"
          },
          {
            name: "MACHINE CHEST-SUPPORTED T-BAR ROW/RETRACTION",
            sets: 3,
            reps: "10/10",
            rpe: 8,
            rest: "1-2MIN",
            notes: "FIRST 10 REPS RETRACT YOUR SCAPULAE AND PULL YOUR ELBOWS OUT, LAST 10 REPS ONLY GO THROUGH A SCAPULAR ROM (YOUR ARMS DON'T MOVE)"
          },
          {
            name: "CABLE FLYE",
            sets: 3,
            reps: 15,
            rpe: 7,
            rest: "1-2MIN",
            notes: "KEEP YOUR SCAPULAE RETRACTED AND DEPRESSED"
          },
          {
            name: "V-BAR PRESSDOWN",
            sets: 2,
            reps: 15,
            rpe: 7,
            rest: "1-2MIN",
            notes: "KEEP YOUR SHOULDER AND ELBOW LOCKED IN PLACE"
          },
          {
            name: "PRONE TRAP RAISE",
            sets: 3,
            reps: 15,
            rpe: 8,
            rest: "1-2MIN",
            notes: "FOCUS ON SQUEEZING YOUR UPPER BACK TO MOVE THE WEIGHT"
          }
        ]
      }
    ]
  },
  week4: {
    days: [
      {
        type: "UPPER BODY #1",
        totalSetVolume: 18,
        exercises: [
          {
            name: "BARBELL BENCH PRESS",
            sets: 4,
            reps: 6,
            percentage: 85,
            rest: "3-5MIN",
            notes: "45° ELBOW TUCK"
          },
          {
            name: "PULL-UP",
            sets: 3,
            reps: 8,
            rpe: 8,
            rest: "2-3MIN",
            notes: "PULL YOUR SHOULDERS DOWN AND IN"
          },
          {
            name: "ECCENTRIC-ACCENTUATED BARBELL INCLINE PRESS",
            sets: 2,
            reps: 8,
            rpe: 8,
            rest: "2-3MIN",
            notes: "2-SECOND LOWERING PHASE. ELBOWS TUCKED ~30°"
          },
          {
            name: "INVERTED ROW",
            sets: 3,
            reps: 10,
            rpe: 8,
            rest: "2-3MIN",
            notes: "SCAPULAE BACK AND DOWN. PULL WITH YOUR ELBOWS OUT"
          },
          {
            name: "DIP",
            sets: 2,
            reps: 10,
            rpe: 7,
            rest: "1-2MIN",
            notes: "KEEP YOUR SCAPULAE RETRACTED AND DEPRESSED"
          },
          {
            name: "BARBELL FLOOR SKULL CRUSHER",
            sets: 2,
            reps: 8,
            rpe: 7,
            rest: "1-2MIN",
            notes: "KEEP YOUR ELBOWS OVER YOUR HEAD. KEEP YOUR SHOULDER JOINT MOTIONLESS"
          },
          {
            name: "HAMMER CURL",
            sets: 2,
            reps: 10,
            rpe: 8,
            rest: "1-2MIN",
            notes: "CURL THE WEIGHT \"OUT\", NOT \"UP\""
          }
        ]
      },
      {
        type: "LOWER BODY #1",
        totalSetVolume: 15,
        exercises: [
          {
            name: "BACK SQUAT",
            sets: 3,
            reps: 5,
            percentage: 80,
            rest: "3-4MIN",
            notes: "SIT DOWN AND BACK"
          },
          {
            name: "STIFF LEG DEADLIFT",
            sets: 3,
            reps: 10,
            rpe: 8,
            rest: "2-3MIN",
            notes: "KEEP YOUR HIPS HIGH"
          },
          {
            name: "BARBELL HIP THRUST",
            sets: 3,
            reps: 15,
            rpe: 7,
            rest: "2-3MIN",
            notes: "USE A PAD. RIB CAGE AND CHIN TUCKED DOWN"
          },
          {
            name: "LYING LEG CURL",
            sets: 3,
            reps: 20,
            rpe: 8,
            rest: "0MIN",
            notes: "FOCUS ON SQUEEZING YOUR HAMSTRINGS TO MOVE THE WEIGHT"
          },
          {
            name: "LEG EXTENSION",
            sets: 3,
            reps: 20,
            rpe: 8,
            rest: "1-2MIN",
            notes: "FOCUS ON SQUEEZING YOUR QUADS TO MOVE THE WEIGHT"
          }
        ]
      },
      {
        type: "UPPER BODY #2",
        totalSetVolume: 22,
        exercises: [
          {
            name: "BARBELL BENCH PRESS",
            sets: 5,
            reps: 3,
            percentage: 85,
            rest: "3-5MIN",
            notes: "45° ELBOW TUCK"
          },
          {
            name: "NEUTRAL-GRIP PULLDOWN",
            sets: 4,
            reps: 6,
            rpe: 8,
            rest: "2-3MIN",
            notes: "PULL YOUR SHOULDERS DOWN AGAINST YOUR SIDES"
          },
          {
            name: "BARBELL PIN PRESS",
            sets: 2,
            reps: 8,
            rpe: 7,
            rest: "2-3MIN",
            notes: "START WITH THE BAR ON THE PINS. FOCUS ON SPEED OFF OF THE CHEST"
          },
          {
            name: "SEATED FACE PULL",
            sets: 3,
            reps: 15,
            rpe: 8,
            rest: "1-2MIN",
            notes: "PULL YOUR ELBOWS UP AND BACK. FOCUS ON SCAPULAR RETRACTION"
          },
          {
            name: "MILITARY PRESS",
            sets: 2,
            reps: 6,
            rpe: 7,
            rest: "2-3MIN",
            notes: "RESET THE BAR AFTER EACH REP. THINK ABOUT DOING A \"DEAD PRESS\". SQUEEZE YOUR GLUTES TO KEEP YOUR TORSO UPRIGHT"
          },
          {
            name: "DUMBBELL LATERAL RAISE",
            sets: 3,
            reps: 12,
            rpe: 8,
            rest: "1-2MIN",
            notes: "FOCUS ON SQUEEZING YOUR DELTOIDS TO MOVE THE WEIGHT"
          },
          {
            name: "REVERSE PEC DECK",
            sets: 3,
            reps: 15,
            rpe: 8,
            rest: "1-2MIN",
            notes: "TAKE YOUR SCAPULAE THROUGH A ROM"
          }
        ]
      },
      {
        type: "LOWER BODY #2",
        totalSetVolume: 16,
        exercises: [
          {
            name: "DEADLIFT",
            sets: 4,
            reps: 6,
            percentage: 75,
            rest: "3-4MIN",
            notes: "FOCUS ON KEEPING YOUR SPINE NEUTRAL"
          },
          {
            name: "FRONT SQUAT",
            sets: 3,
            reps: 10,
            rpe: 7,
            rest: "2-3MIN",
            notes: "FOCUS ON KEEPING YOUR TORSO UPRIGHT"
          },
          {
            name: "LEG PRESS",
            sets: 3,
            reps: 12,
            rpe: 7,
            rest: "1-2MIN",
            notes: "FOCUS ON SQUEEZING YOUR QUADS TO MOVE THE WEIGHT"
          },
          {
            name: "ECCENTRIC-ACCENTUATED LYING LEG CURL",
            sets: 3,
            reps: 10,
            rpe: 8,
            rest: "1-2MIN",
            notes: "3-SECOND LOWERING PHASE"
          },
          {
            name: "STANDING CALF RAISE",
            sets: 3,
            reps: 12,
            rpe: 8,
            rest: "1-2MIN",
            notes: "PRESS ALL THE WAY UP TO YOUR TOES, GET A STRETCH AT THE BOTTOM. DON'T BOUNCE"
          }
        ]
      },
      {
        type: "UPPER BODY #3",
        totalSetVolume: 21,
        exercises: [
          {
            name: "PAUSE BARBELL BENCH PRESS",
            sets: 5,
            reps: 5,
            percentage: 72.5,
            rest: "3-5MIN",
            notes: "3-SECOND PAUSE. FOCUS ON SPEED OFF THE CHEST"
          },
          {
            name: "SUPINATED PULLDOWN",
            sets: 3,
            reps: 12,
            rpe: 8,
            rest: "2-3MIN",
            notes: "PULL YOUR SHOULDERS DOWN AGAINST YOUR SIDES"
          },
          {
            name: "DUMBBELL INCLINE PRESS",
            sets: 2,
            reps: 12,
            rpe: 7,
            rest: "2-3MIN",
            notes: "FOCUS ON PRESSING EVENLY. 30° ELBOW TUCK"
          },
          {
            name: "MACHINE CHEST-SUPPORTED T-BAR ROW/RETRACTION",
            sets: 3,
            reps: "10/10",
            rpe: 8,
            rest: "1-2MIN",
            notes: "FIRST 10 REPS RETRACT YOUR SCAPULAE AND PULL YOUR ELBOWS OUT, LAST 10 REPS ONLY GO THROUGH A SCAPULAR ROM (YOUR ARMS DON'T MOVE)"
          },
          {
            name: "CABLE FLYE",
            sets: 3,
            reps: 15,
            rpe: 7,
            rest: "1-2MIN",
            notes: "KEEP YOUR SCAPULAE RETRACTED AND DEPRESSED"
          },
          {
            name: "V-BAR PRESSDOWN",
            sets: 2,
            reps: 15,
            rpe: 7,
            rest: "1-2MIN",
            notes: "KEEP YOUR SHOULDER AND ELBOW LOCKED IN PLACE"
          },
          {
            name: "PRONE TRAP RAISE",
            sets: 3,
            reps: 15,
            rpe: 8,
            rest: "1-2MIN",
            notes: "FOCUS ON SQUEEZING YOUR UPPER BACK TO MOVE THE WEIGHT"
          }
        ]
      }
    ]
  },
  week5: {
    days: [
      {
        type: "UPPER BODY #1",
        totalSetVolume: 14,
        exercises: [
          {
            name: "BARBELL BENCH PRESS",
            sets: 1,
            reps: 5,
            rpe: 9,
            rest: "N/A",
            notes: "WORK UP TO A HEAVY SET OF 5 @RPE9"
          },
          {
            name: "PAUSE BARBELL BENCH PRESS",
            sets: 2,
            reps: 5,
            percentage: 65,
            rest: "3-5MIN",
            notes: "3-SECOND PAUSE. FOCUS ON SPEED OFF THE CHEST"
          },
          {
            name: "PULL-UP",
            sets: 3,
            reps: 10,
            rpe: 8,
            rest: "2-3MIN",
            notes: "PULL YOUR SHOULDERS DOWN AND IN"
          },
          {
            name: "MILITARY PRESS",
            sets: 2,
            reps: 8,
            rpe: 7,
            rest: "2-3MIN",
            notes: "RESET THE BAR AFTER EACH REP. THINK ABOUT DOING A \"DEAD PRESS\". SQUEEZE YOUR GLUTES TO KEEP YOUR TORSO UPRIGHT"
          },
          {
            name: "MACHINE CHEST-SUPPORTED T-BAR ROW/RETRACTION",
            sets: 3,
            reps: "10/10",
            rpe: 8,
            rest: "2-3MIN",
            notes: "FIRST 10 REPS RETRACT YOUR SCAPULAE AND PULL YOUR ELBOWS OUT, LAST 10 REPS ONLY GO THROUGH A SCAPULAR ROM (YOUR ARMS DON'T MOVE)"
          },
          {
            name: "HAMMER CURL",
            sets: 3,
            reps: 12,
            rpe: 8,
            rest: "2-3MIN",
            notes: "CURL THE WEIGHT \"OUT\", NOT \"UP\""
          }
        ]
      },
      {
        type: "LOWER BODY #1",
        totalSetVolume: 16,
        exercises: [
          {
            name: "BACK SQUAT",
            sets: 4,
            reps: 8,
            percentage: 70,
            rest: "3-4MIN",
            notes: "SIT DOWN AND BACK"
          },
          {
            name: "BARBELL RDL",
            sets: 3,
            reps: 15,
            rpe: 7,
            rest: "2-3MIN",
            notes: "FOCUS ON KEEPING YOUR SPINE NEUTRAL"
          },
          {
            name: "LYING LEG CURL",
            sets: 3,
            reps: 12,
            rpe: 7,
            rest: "1-2MIN",
            notes: "FOCUS ON SQUEEZING YOUR HAMSTRINGS TO MOVE THE WEIGHT"
          },
          {
            name: "DUMBBELL WALKING LUNGE",
            sets: 3,
            reps: 12,
            rpe: 8,
            rest: "1-2MIN",
            notes: "12 STEPS EACH LEG. MEDIUM STRIDE LENGTH"
          },
          {
            name: "STANDING CALF RAISE",
            sets: 3,
            reps: 8,
            rpe: 8,
            rest: "1-2MIN",
            notes: "PRESS ALL THE WAY UP TO YOUR TOES, GET A STRETCH AT THE BOTTOM. DON'T BOUNCE"
          }
        ]
      },
      {
        type: "UPPER BODY #2",
        totalSetVolume: 21,
        exercises: [
          {
            name: "BARBELL SPEED BENCH PRESS",
            sets: 6,
            reps: 3,
            percentage: 70,
            rest: "2-3MIN",
            notes: "FOCUS ON STAYING TIGHT AND SPEED OFF THE CHEST"
          },
          {
            name: "WIDE-GRIP LAT PULLDOWN",
            sets: 3,
            reps: 8,
            rpe: 8,
            rest: "2-3MIN",
            notes: "PULL YOUR SHOULDERS DOWN AND IN"
          },
          {
            name: "DUMBBELL LATERAL RAISE",
            sets: 3,
            reps: 15,
            rpe: 7,
            rest: "1-2MIN",
            notes: "FOCUS ON SQUEEZING YOUR DELTOIDS TO MOVE THE WEIGHT"
          },
          {
            name: "SEATED FACE PULL",
            sets: 3,
            reps: 20,
            rpe: 8,
            rest: "1-2MIN",
            notes: "PULL YOUR ELBOWS UP AND BACK. FOCUS ON SCAPULAR RETRACTION"
          },
          {
            name: "PRONE TRAP RAISE",
            sets: 3,
            reps: 15,
            rpe: 7,
            rest: "1-2MIN",
            notes: "FOCUS ON SQUEEZING YOUR UPPER BACK TO MOVE THE WEIGHT"
          },
          {
            name: "EZ BAR CURL",
            sets: 3,
            reps: 12,
            rpe: 8,
            rest: "1-2MIN",
            notes: "CURL THE WEIGHT \"OUT\", NOT \"UP\""
          }
        ]
      },
      {
        type: "LOWER BODY #2",
        totalSetVolume: 15,
        exercises: [
          {
            name: "DEADLIFT",
            sets: 4,
            reps: 6,
            percentage: 75,
            rest: "3-4MIN",
            notes: "FOCUS ON KEEPING YOUR SPINE NEUTRAL"
          },
          {
            name: "FRONT SQUAT",
            sets: 3,
            reps: 10,
            rpe: 7,
            rest: "2-3MIN",
            notes: "FOCUS ON KEEPING YOUR TORSO UPRIGHT"
          },
          {
            name: "LEG PRESS",
            sets: 3,
            reps: 12,
            rpe: 7,
            rest: "1-2MIN",
            notes: "FOCUS ON SQUEEZING YOUR QUADS TO MOVE THE WEIGHT"
          },
          {
            name: "ECCENTRIC-ACCENTUATED LYING LEG CURL",
            sets: 3,
            reps: 10,
            rpe: 8,
            rest: "1-2MIN",
            notes: "3-SECOND LOWERING PHASE"
          },
          {
            name: "STANDING CALF RAISE",
            sets: 3,
            reps: 12,
            rpe: 8,
            rest: "1-2MIN",
            notes: "PRESS ALL THE WAY UP TO YOUR TOES, GET A STRETCH AT THE BOTTOM. DON'T BOUNCE"
          }
        ]
      }
    ]
  },
  week6: {
    days: [
      {
        type: "UPPER BODY #1",
        totalSetVolume: 14,
        exercises: [
          {
            name: "BARBELL BENCH PRESS",
            sets: 1,
            reps: "AMRAP",
            percentage: 85,
            rest: "N/A",
            notes: "DO AS MANY REPS AS POSSIBLE @RPE9"
          },
          {
            name: "PAUSE BARBELL BENCH PRESS",
            sets: 2,
            reps: 5,
            percentage: 65,
            rest: "3-5MIN",
            notes: "3-SECOND PAUSE. FOCUS ON SPEED OFF THE CHEST"
          },
          {
            name: "PULL-UP",
            sets: 3,
            reps: 10,
            rpe: 8,
            rest: "2-3MIN",
            notes: "PULL YOUR SHOULDERS DOWN AND IN"
          },
          {
            name: "MILITARY PRESS",
            sets: 2,
            reps: 8,
            rpe: 7,
            rest: "2-3MIN",
            notes: "RESET THE BAR AFTER EACH REP. THINK ABOUT DOING A \"DEAD PRESS\". SQUEEZE YOUR GLUTES TO KEEP YOUR TORSO UPRIGHT"
          },
          {
            name: "MACHINE CHEST-SUPPORTED T-BAR ROW/RETRACTION",
            sets: 3,
            reps: "10/10",
            rpe: 8,
            rest: "2-3MIN",
            notes: "FIRST 10 REPS RETRACT YOUR SCAPULAE AND PULL YOUR ELBOWS OUT, LAST 10 REPS ONLY GO THROUGH A SCAPULAR ROM (YOUR ARMS DON'T MOVE)"
          },
          {
            name: "HAMMER CURL",
            sets: 3,
            reps: 12,
            rpe: 8,
            rest: "2-3MIN",
            notes: "CURL THE WEIGHT \"OUT\", NOT \"UP\""
          }
        ]
      },
      {
        type: "LOWER BODY #1",
        totalSetVolume: 16,
        exercises: [
          {
            name: "BACK SQUAT",
            sets: 4,
            reps: 8,
            percentage: 70,
            rest: "3-4MIN",
            notes: "SIT DOWN AND BACK"
          },
          {
            name: "BARBELL RDL",
            sets: 3,
            reps: 15,
            rpe: 7,
            rest: "2-3MIN",
            notes: "FOCUS ON KEEPING YOUR SPINE NEUTRAL"
          },
          {
            name: "LYING LEG CURL",
            sets: 3,
            reps: 12,
            rpe: 7,
            rest: "1-2MIN",
            notes: "FOCUS ON SQUEEZING YOUR HAMSTRINGS TO MOVE THE WEIGHT"
          },
          {
            name: "DUMBBELL WALKING LUNGE",
            sets: 3,
            reps: 12,
            rpe: 8,
            rest: "1-2MIN",
            notes: "12 STEPS EACH LEG. MEDIUM STRIDE LENGTH"
          },
          {
            name: "STANDING CALF RAISE",
            sets: 3,
            reps: 8,
            rpe: 8,
            rest: "1-2MIN",
            notes: "PRESS ALL THE WAY UP TO YOUR TOES, GET A STRETCH AT THE BOTTOM. DON'T BOUNCE"
          }
        ]
      },
      {
        type: "UPPER BODY #2",
        totalSetVolume: 21,
        exercises: [
          {
            name: "BARBELL SPEED BENCH PRESS",
            sets: 6,
            reps: 3,
            percentage: 70,
            rest: "2-3MIN",
            notes: "FOCUS ON STAYING TIGHT AND SPEED OFF THE CHEST"
          },
          {
            name: "WIDE-GRIP LAT PULLDOWN",
            sets: 3,
            reps: 8,
            rpe: 8,
            rest: "2-3MIN",
            notes: "PULL YOUR SHOULDERS DOWN AND IN"
          },
          {
            name: "DUMBBELL LATERAL RAISE",
            sets: 3,
            reps: 15,
            rpe: 7,
            rest: "1-2MIN",
            notes: "FOCUS ON SQUEEZING YOUR DELTOIDS TO MOVE THE WEIGHT"
          },
          {
            name: "SEATED FACE PULL",
            sets: 3,
            reps: 20,
            rpe: 8,
            rest: "1-2MIN",
            notes: "PULL YOUR ELBOWS UP AND BACK. FOCUS ON SCAPULAR RETRACTION"
          },
          {
            name: "PRONE TRAP RAISE",
            sets: 3,
            reps: 15,
            rpe: 7,
            rest: "1-2MIN",
            notes: "FOCUS ON SQUEEZING YOUR UPPER BACK TO MOVE THE WEIGHT"
          },
          {
            name: "EZ BAR CURL",
            sets: 3,
            reps: 12,
            rpe: 8,
            rest: "1-2MIN",
            notes: "CURL THE WEIGHT \"OUT\", NOT \"UP\""
          }
        ]
      },
      {
        type: "LOWER BODY #2",
        totalSetVolume: 15,
        exercises: [
          {
            name: "DEADLIFT",
            sets: 3,
            reps: 8,
            percentage: 70,
            rest: "3-5MIN",
            notes: "FOCUS ON KEEPING YOUR SPINE NEUTRAL"
          },
          {
            name: "HACK SQUAT",
            sets: 3,
            reps: 12,
            rpe: 8,
            rest: "2-3MIN",
            notes: "SIT DOWN AND BACK"
          },
          {
            name: "REVERSE HYPEREXTENSION",
            sets: 3,
            reps: 10,
            rpe: 8,
            rest: "1-2MIN",
            notes: "SQUEEZE YOUR GLUTES TO MOVE YOUR LEGS"
          },
          {
            name: "LEG EXTENSION",
            sets: 3,
            reps: 15,
            rpe: 8,
            rest: "1-2MIN",
            notes: "FOCUS ON SQUEEZING YOUR QUADS TO MOVE THE WEIGHT"
          },
          {
            name: "SEATED LEG CURL",
            sets: 3,
            reps: 12,
            rpe: 7,
            rest: "1-2MIN",
            notes: "FOCUS ON SQUEEZING YOUR HAMSTRINGS TO MOVE THE WEIGHT"
          }
        ]
      }
    ]
  },
  week7: {
    days: [
      {
        type: "UPPER BODY #1",
        totalSetVolume: 14,
        exercises: [
          {
            name: "BARBELL BENCH PRESS",
            sets: 1,
            reps: 3,
            rpe: 9,
            rest: "N/A",
            notes: "WORK UP TO A HEAVY SET OF 3 @RPE9"
          },
          {
            name: "PAUSE BARBELL BENCH PRESS",
            sets: 2,
            reps: 5,
            percentage: 65,
            rest: "3-5MIN",
            notes: "3-SECOND PAUSE. FOCUS ON SPEED OFF THE CHEST"
          },
          {
            name: "PULL-UP",
            sets: 3,
            reps: 10,
            rpe: 8,
            rest: "2-3MIN",
            notes: "PULL YOUR SHOULDERS DOWN AND IN"
          },
          {
            name: "MILITARY PRESS",
            sets: 2,
            reps: 8,
            rpe: 7,
            rest: "2-3MIN",
            notes: "RESET THE BAR AFTER EACH REP. THINK ABOUT DOING A \"DEAD PRESS\". SQUEEZE YOUR GLUTES TO KEEP YOUR TORSO UPRIGHT"
          },
          {
            name: "MACHINE CHEST-SUPPORTED T-BAR ROW/RETRACTION",
            sets: 3,
            reps: "10/10",
            rpe: 8,
            rest: "2-3MIN",
            notes: "FIRST 10 REPS RETRACT YOUR SCAPULAE AND PULL YOUR ELBOWS OUT, LAST 10 REPS ONLY GO THROUGH A SCAPULAR ROM (YOUR ARMS DON'T MOVE)"
          },
          {
            name: "HAMMER CURL",
            sets: 3,
            reps: 12,
            rpe: 8,
            rest: "2-3MIN",
            notes: "CURL THE WEIGHT \"OUT\", NOT \"UP\""
          }
        ]
      },
      {
        type: "LOWER BODY #1",
        totalSetVolume: 16,
        exercises: [
          {
            name: "BACK SQUAT",
            sets: 4,
            reps: 8,
            percentage: 72.5,
            rest: "3-4MIN",
            notes: "SIT DOWN AND BACK"
          },
          {
            name: "BARBELL RDL",
            sets: 3,
            reps: 15,
            rpe: 7,
            rest: "2-3MIN",
            notes: "FOCUS ON KEEPING YOUR SPINE NEUTRAL"
          },
          {
            name: "LYING LEG CURL",
            sets: 3,
            reps: 12,
            rpe: 7,
            rest: "1-2MIN",
            notes: "FOCUS ON SQUEEZING YOUR HAMSTRINGS TO MOVE THE WEIGHT"
          },
          {
            name: "DUMBBELL WALKING LUNGE",
            sets: 3,
            reps: 12,
            rpe: 8,
            rest: "1-2MIN",
            notes: "12 STEPS EACH LEG. MEDIUM STRIDE LENGTH"
          },
          {
            name: "STANDING CALF RAISE",
            sets: 3,
            reps: 8,
            rpe: 8,
            rest: "1-2MIN",
            notes: "PRESS ALL THE WAY UP TO YOUR TOES, GET A STRETCH AT THE BOTTOM. DON'T BOUNCE"
          }
        ]
      },
      {
        type: "UPPER BODY #2",
        totalSetVolume: 21,
        exercises: [
          {
            name: "BARBELL SPEED BENCH PRESS",
            sets: 6,
            reps: 3,
            percentage: 70,
            rest: "2-3MIN",
            notes: "FOCUS ON STAYING TIGHT AND SPEED OFF THE CHEST"
          },
          {
            name: "WIDE-GRIP LAT PULLDOWN",
            sets: 3,
            reps: 8,
            rpe: 8,
            rest: "2-3MIN",
            notes: "PULL YOUR SHOULDERS DOWN AND IN"
          },
          {
            name: "DUMBBELL LATERAL RAISE",
            sets: 3,
            reps: 15,
            rpe: 7,
            rest: "1-2MIN",
            notes: "FOCUS ON SQUEEZING YOUR DELTOIDS TO MOVE THE WEIGHT"
          },
          {
            name: "SEATED FACE PULL",
            sets: 3,
            reps: 20,
            rpe: 8,
            rest: "1-2MIN",
            notes: "PULL YOUR ELBOWS UP AND BACK. FOCUS ON SCAPULAR RETRACTION"
          },
          {
            name: "PRONE TRAP RAISE",
            sets: 3,
            reps: 15,
            rpe: 7,
            rest: "1-2MIN",
            notes: "FOCUS ON SQUEEZING YOUR UPPER BACK TO MOVE THE WEIGHT"
          },
          {
            name: "EZ BAR CURL",
            sets: 3,
            reps: 12,
            rpe: 8,
            rest: "1-2MIN",
            notes: "CURL THE WEIGHT \"OUT\", NOT \"UP\""
          }
        ]
      },
      {
        type: "LOWER BODY #2",
        totalSetVolume: 15,
        exercises: [
          {
            name: "DEADLIFT",
            sets: 3,
            reps: 8,
            percentage: 70,
            rest: "3-5MIN",
            notes: "FOCUS ON KEEPING YOUR SPINE NEUTRAL"
          },
          {
            name: "HACK SQUAT",
            sets: 3,
            reps: 12,
            rpe: 8,
            rest: "2-3MIN",
            notes: "SIT DOWN AND BACK"
          },
          {
            name: "REVERSE HYPEREXTENSION",
            sets: 3,
            reps: 10,
            rpe: 8,
            rest: "1-2MIN",
            notes: "SQUEEZE YOUR GLUTES TO MOVE YOUR LEGS"
          },
          {
            name: "LEG EXTENSION",
            sets: 3,
            reps: 15,
            rpe: 8,
            rest: "1-2MIN",
            notes: "FOCUS ON SQUEEZING YOUR QUADS TO MOVE THE WEIGHT"
          },
          {
            name: "SEATED LEG CURL",
            sets: 3,
            reps: 12,
            rpe: 7,
            rest: "1-2MIN",
            notes: "FOCUS ON SQUEEZING YOUR HAMSTRINGS TO MOVE THE WEIGHT"
          }
        ]
      }
    ]
  },
  week8: {
    days: [
      {
        type: "UPPER BODY #1",
        totalSetVolume: 14,
        exercises: [
          {
            name: "BARBELL BENCH PRESS",
            sets: 1,
            reps: 1,
            rpe: 9,
            rest: "N/A",
            notes: "WORK UP TO A HEAVY SINGLE @RPE9"
          },
          {
            name: "PAUSE BARBELL BENCH PRESS",
            sets: 2,
            reps: 5,
            percentage: 65,
            rest: "3-5MIN",
            notes: "3-SECOND PAUSE. FOCUS ON SPEED OFF THE CHEST"
          },
          {
            name: "PULL-UP",
            sets: 3,
            reps: 10,
            rpe: 8,
            rest: "2-3MIN",
            notes: "PULL YOUR SHOULDERS DOWN AND IN"
          },
          {
            name: "MILITARY PRESS",
            sets: 2,
            reps: 8,
            rpe: 7,
            rest: "2-3MIN",
            notes: "RESET THE BAR AFTER EACH REP. THINK ABOUT DOING A \"DEAD PRESS\". SQUEEZE YOUR GLUTES TO KEEP YOUR TORSO UPRIGHT"
          },
          {
            name: "MACHINE CHEST-SUPPORTED T-BAR ROW/RETRACTION",
            sets: 3,
            reps: "10/10",
            rpe: 8,
            rest: "2-3MIN",
            notes: "FIRST 10 REPS RETRACT YOUR SCAPULAE AND PULL YOUR ELBOWS OUT, LAST 10 REPS ONLY GO THROUGH A SCAPULAR ROM (YOUR ARMS DON'T MOVE)"
          },
          {
            name: "HAMMER CURL",
            sets: 3,
            reps: 12,
            rpe: 8,
            rest: "2-3MIN",
            notes: "CURL THE WEIGHT \"OUT\", NOT \"UP\""
          }
        ]
      },
      {
        type: "LOWER BODY #1",
        totalSetVolume: 16,
        exercises: [
          {
            name: "BACK SQUAT",
            sets: 4,
            reps: 8,
            percentage: 72.5,
            rest: "3-4MIN",
            notes: "SIT DOWN AND BACK"
          },
          {
            name: "BARBELL RDL",
            sets: 3,
            reps: 15,
            rpe: 7,
            rest: "2-3MIN",
            notes: "FOCUS ON KEEPING YOUR SPINE NEUTRAL"
          },
          {
            name: "LYING LEG CURL",
            sets: 3,
            reps: 12,
            rpe: 7,
            rest: "1-2MIN",
            notes: "FOCUS ON SQUEEZING YOUR HAMSTRINGS TO MOVE THE WEIGHT"
          },
          {
            name: "DUMBBELL WALKING LUNGE",
            sets: 3,
            reps: 12,
            rpe: 8,
            rest: "1-2MIN",
            notes: "12 STEPS EACH LEG. MEDIUM STRIDE LENGTH"
          },
          {
            name: "STANDING CALF RAISE",
            sets: 3,
            reps: 8,
            rpe: 8,
            rest: "1-2MIN",
            notes: "PRESS ALL THE WAY UP TO YOUR TOES, GET A STRETCH AT THE BOTTOM. DON'T BOUNCE"
          }
        ]
      },
      {
        type: "UPPER BODY #2",
        totalSetVolume: 21,
        exercises: [
          {
            name: "BARBELL SPEED BENCH PRESS",
            sets: 6,
            reps: 3,
            percentage: 70,
            rest: "2-3MIN",
            notes: "FOCUS ON STAYING TIGHT AND SPEED OFF THE CHEST"
          },
          {
            name: "WIDE-GRIP LAT PULLDOWN",
            sets: 3,
            reps: 8,
            rpe: 8,
            rest: "2-3MIN",
            notes: "PULL YOUR SHOULDERS DOWN AND IN"
          },
          {
            name: "DUMBBELL LATERAL RAISE",
            sets: 3,
            reps: 15,
            rpe: 7,
            rest: "1-2MIN",
            notes: "FOCUS ON SQUEEZING YOUR DELTOIDS TO MOVE THE WEIGHT"
          },
          {
            name: "SEATED FACE PULL",
            sets: 3,
            reps: 20,
            rpe: 8,
            rest: "1-2MIN",
            notes: "PULL YOUR ELBOWS UP AND BACK. FOCUS ON SCAPULAR RETRACTION"
          },
          {
            name: "PRONE TRAP RAISE",
            sets: 3,
            reps: 15,
            rpe: 7,
            rest: "1-2MIN",
            notes: "FOCUS ON SQUEEZING YOUR UPPER BACK TO MOVE THE WEIGHT"
          },
          {
            name: "EZ BAR CURL",
            sets: 3,
            reps: 12,
            rpe: 8,
            rest: "1-2MIN",
            notes: "CURL THE WEIGHT \"OUT\", NOT \"UP\""
          }
        ]
      },
      {
        type: "LOWER BODY #2",
        totalSetVolume: 15,
        exercises: [
          {
            name: "DEADLIFT",
            sets: 3,
            reps: 8,
            percentage: 72.5,
            rest: "3-5MIN",
            notes: "FOCUS ON KEEPING YOUR SPINE NEUTRAL"
          },
          {
            name: "HACK SQUAT",
            sets: 3,
            reps: 12,
            rpe: 8,
            rest: "2-3MIN",
            notes: "SIT DOWN AND BACK"
          },
          {
            name: "REVERSE HYPEREXTENSION",
            sets: 3,
            reps: 10,
            rpe: 8,
            rest: "1-2MIN",
            notes: "SQUEEZE YOUR GLUTES TO MOVE YOUR LEGS"
          },
          {
            name: "LEG EXTENSION",
            sets: 3,
            reps: 15,
            rpe: 8,
            rest: "1-2MIN",
            notes: "FOCUS ON SQUEEZING YOUR QUADS TO MOVE THE WEIGHT"
          },
          {
            name: "SEATED LEG CURL",
            sets: 3,
            reps: 12,
            rpe: 7,
            rest: "1-2MIN",
            notes: "FOCUS ON SQUEEZING YOUR HAMSTRINGS TO MOVE THE WEIGHT"
          }
        ]
      }
    ]
  }
};

export default completeProgram;