"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  Leaf,
  Recycle,
  Zap,
  Package,
  Trash2,
  CheckCircle2,
  Circle,
  Sun,
  Moon,
} from "lucide-react";

export default function EcoTrackSimulator() {
const [showSparkle, setShowSparkle] = useState(false);
const [scorePop, setScorePop] = useState(false);


  const [darkMode, setDarkMode] = useState(false);
useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}, [darkMode]);

const toggleDarkMode = () => {
  setDarkMode((prev) => !prev);
};

  // State for habit tracking
  const [habits, setHabits] = useState({
    recycled: true,
    avoidedPlastic: false,
    reusedContainers: true,
    savedElectricity: false,
    composted: true,
  });

  // State for scenario choices tracking
  const [scenarioHistory, setScenarioHistory] = useState([]);
  const [currentScenario, setCurrentScenario] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [ecoScore, setEcoScore] = useState(50); // Start at 50
  const [aiReflection, setAiReflection] = useState("");

  // Mock weekly data
  const weeklyData = [
    { day: "Mon", score: 55 },
    { day: "Tue", score: 60 },
    { day: "Wed", score: 62 },
    { day: "Thu", score: 70 },
    { day: "Fri", score: 75 },
    { day: "Sat", score: 72 },
    { day: "Sun", score: 80 },
  ];

  // Scenario pool with 12+ scenarios (allows repeats for continuous gameplay)
  const scenarioPool = [
    {
      id: 1,
      scenario: "Reuse the jar or throw it?",
      sustainable: "Reuse the jar",
      wasteful: "Throw it away",
      impactSustainable: 8,
      impactWasteful: -10,
    },
    {
      id: 2,
      scenario: "Carry cloth bag or buy plastic?",
      sustainable: "Carry cloth bag",
      wasteful: "Buy plastic bag",
      impactSustainable: 5,
      impactWasteful: -5,
    },
    {
      id: 3,
      scenario: "Sort waste today or skip?",
      sustainable: "Sort waste",
      wasteful: "Skip sorting",
      impactSustainable: 7,
      impactWasteful: -3,
    },
    {
      id: 4,
      scenario: "Turn off unused lights or leave them on?",
      sustainable: "Turn off lights",
      wasteful: "Leave lights on",
      impactSustainable: 5,
      impactWasteful: -7,
    },
    {
      id: 5,
      scenario: "Reuse cooking water or pour it out?",
      sustainable: "Reuse cooking water",
      wasteful: "Pour water out",
      impactSustainable: 6,
      impactWasteful: -4,
    },
    {
      id: 6,
      scenario: "Take a shorter shower or long shower?",
      sustainable: "Take shorter shower",
      wasteful: "Take long shower",
      impactSustainable: 10,
      impactWasteful: -8,
    },
    {
      id: 7,
      scenario: "Compost food scraps or trash them?",
      sustainable: "Compost scraps",
      wasteful: "Throw away scraps",
      impactSustainable: 8,
      impactWasteful: -8,
    },
    {
      id: 8,
      scenario: "Buy local vegetables or packaged imports?",
      sustainable: "Buy local",
      wasteful: "Buy packaged imports",
      impactSustainable: 10,
      impactWasteful: -5,
    },
    {
      id: 9,
      scenario: "Air-dry clothes or use dryer?",
      sustainable: "Air-dry clothes",
      wasteful: "Use dryer",
      impactSustainable: 10,
      impactWasteful: -10,
    },
    {
      id: 10,
      scenario: "Refill a bottle or buy a new one?",
      sustainable: "Refill bottle",
      wasteful: "Buy new bottle",
      impactSustainable: 4,
      impactWasteful: -4,
    },
    {
      id: 11,
      scenario: "Fix a broken item or replace it?",
      sustainable: "Fix the item",
      wasteful: "Replace immediately",
      impactSustainable: 20,
      impactWasteful: -10,
    },
    {
      id: 12,
      scenario: "Use public transport or private vehicle?",
      sustainable: "Take public transport",
      wasteful: "Use private vehicle",
      impactSustainable: 10,
      impactWasteful: -10,
    },
  ];

  // Get random scenario from pool (allows repeats for continuous gameplay)
  const getRandomScenario = () => {
    const randomIndex = Math.floor(Math.random() * scenarioPool.length);
    return scenarioPool[randomIndex];
  };

  // Update EcoScore based on impact
  const updateEcoScore = (impact) => {
    const newScore = Math.min(100, Math.max(0, ecoScore + impact));
    setEcoScore(newScore);
    return newScore;
  };

  // Five scenario cards with their details
  const scenarios = [
    {
      id: 1,
      question: "Reuse the jar or throw it away?",
      sustainableAction: "Reuse",
      wastefulAction: "Throw",
      icon: Package,
    },
    {
      id: 2,
      question: "Carry cloth bag or buy plastic?",
      sustainableAction: "Cloth",
      wastefulAction: "Plastic",
      icon: Package,
    },
    {
      id: 3,
      question: "Sort waste today or skip?",
      sustainableAction: "Sort",
      wastefulAction: "Skip",
      icon: Recycle,
    },
    {
      id: 4,
      question: "Turn off lights or leave them on?",
      sustainableAction: "Off",
      wastefulAction: "On",
      icon: Zap,
    },
    {
      id: 5,
      question: "Reuse leftover water or pour away?",
      sustainableAction: "Reuse",
      wastefulAction: "Waste",
      icon: Leaf,
    },
  ];

  // Calculate house state based on eco score with new mapping
  const getHouseState = (score) => {
    if (score === 100)
  return {
    emoji: "🌟",
    label: "Perfect — outstanding sustainability!",
    bgColor: "bg-emerald-200",
    textColor: "text-emerald-800",
    accentColor: "text-emerald-600",
  };
      if (score >= 70)
      return {
        emoji: "🌿",
        label: "Green Home — thriving.",
        bgColor: "bg-green-100",
        textColor: "text-green-800",
        accentColor: "text-green-600",
      };
    if (score >= 40)
      return {
        emoji: "😐",
        label: "Neutral — room to grow.",
        bgColor: "bg-yellow-50",
        textColor: "text-yellow-800",
        accentColor: "text-yellow-600",
      };
      else
    return {
      emoji: "🗑️",
      label: "Wasteful — small changes help.",
      bgColor: "bg-slate-50",
      textColor: "text-slate-700",
      accentColor: "text-slate-600",
    };
  };

  // Generate personalized AI reflection based on habits and scenario history
  const generateReflection = (habitData, scenarioHistory, ecoScore) => {
    // Get checked habits
    const checkedHabits = Object.entries(habitData)
      .filter(([key, value]) => value)
      .map(([key, value]) => {
        const habitLabels = {
          recycled: "recycling",
          avoidedPlastic: "avoiding plastic",
          reusedContainers: "reusing containers",
          savedElectricity: "saving electricity",
          composted: "composting",
        };
        return habitLabels[key];
      });

    // Get unchecked habits for suggestions
    const uncheckedHabits = Object.entries(habitData)
      .filter(([key, value]) => !value)
      .map(([key, value]) => {
        const habitSuggestions = {
          recycled: "sort your recyclables for one day",
          avoidedPlastic: "bring a reusable bag on your next shopping trip",
          reusedContainers: "save one jar or container this week",
          savedElectricity: "unplug devices when leaving home",
          composted: "sort food waste for one meal tomorrow",
        };
        return habitSuggestions[key];
      });

    // Get recent scenario choices for personalized feedback
    const recentSustainableChoices = scenarioHistory
      .filter((choice) => choice.choice === "Sustainable")
      .slice(-2); // Last 2 sustainable choices

    // Create the congratulation part
    let congrats = "";
    if (recentSustainableChoices.length > 0) {
      const lastChoice =
        recentSustainableChoices[recentSustainableChoices.length - 1];
      congrats = `Great choice ${lastChoice.scenario.toLowerCase()} today`;
    } else if (checkedHabits.length > 0) {
      if (checkedHabits.length === 1) {
        congrats = `Nice job ${checkedHabits[0]} this week`;
      } else {
        congrats = `Great work on ${checkedHabits
          .slice(0, -1)
          .join(", ")}, and ${checkedHabits[checkedHabits.length - 1]}`;
      }
    } else {
      congrats = "Every small step counts";
    }

    // Create the state observation
    let stateObservation = "";
    if (ecoScore >= 70) {
      stateObservation = "your simulated home feels brighter 🌿";
    } else if (ecoScore >= 40) {
      stateObservation = "your home is slowly turning greener 🌱";
    } else {
      stateObservation =
        "you're building the foundation for a greener tomorrow 🌱";
    }

    // Create the tip
    let tip = "";
    if (uncheckedHabits.length > 0) {
      const randomTip =
        uncheckedHabits[Math.floor(Math.random() * uncheckedHabits.length)];
      tip = `Try ${randomTip} tomorrow for an extra boost.`;
    } else {
      tip = "Keep up these great habits for continued impact!";
    }

    return `${congrats} — ${stateObservation}. ${tip}`;
  };

  // Handle habit toggle with +5/-5 points
  const toggleHabit = (habitKey) => {
    setHabits((prev) => {
      const newHabits = { ...prev, [habitKey]: !prev[habitKey] };

      // Update eco score: +5 for checking, -5 for unchecking
      const scoreChange = newHabits[habitKey] ? 5 : -5;
      const newScore = Math.min(100, Math.max(0, ecoScore + scoreChange));
      setEcoScore(newScore);

      // Generate new AI reflection based on updated habits and score
      const newReflection = generateReflection(
        newHabits,
        scenarioHistory,
        newScore
      );
      setAiReflection(newReflection);

      return newHabits;
    });
  };

  // Handle scenario choice with smooth transition to next scenario
  const handleScenarioChoice = (isSustainable) => {
    if (!currentScenario || isTransitioning) return;

    // Start transition
    setIsTransitioning(true);

    if (isSustainable) {
    setShowSparkle(true);
    setTimeout(() => setShowSparkle(false), 600);

  setScorePop(true);
  setTimeout(() => setScorePop(false), 300); // pop lasts 0.3s
}
    // Determine impact and update score
    const impact = isSustainable
      ? currentScenario.impactSustainable
      : currentScenario.impactWasteful;
    const newScore = updateEcoScore(impact);

    // Store choice in history
    const choiceRecord = {
      scenario: isSustainable
        ? currentScenario.sustainable
        : currentScenario.wasteful,
      choice: isSustainable ? "Sustainable" : "Wasteful",
      impact: impact,
    };

    const newHistory = [...scenarioHistory, choiceRecord];
    setScenarioHistory(newHistory);

    // Generate new AI reflection
    const newReflection = generateReflection(habits, newHistory, newScore);
    setAiReflection(newReflection);

    // Transition to next scenario after 300ms delay
    setTimeout(() => {
      setCurrentScenario(getRandomScenario());
      setIsTransitioning(false);
    }, 300);
  };

  // Generate initial reflection when component loads
  useEffect(() => {
    const initialReflection = generateReflection(habits, [], ecoScore);
    setAiReflection(initialReflection);
  }, []); // Empty dependency array so it only runs once on mount

  // Initialize with random scenario
  useEffect(() => {
    if (!currentScenario) {
      setCurrentScenario(getRandomScenario());
    }
  }, [currentScenario]);

  const houseState = getHouseState(ecoScore);
  const progressPercentage = ecoScore;

  return (
    // <div className={`${darkMode ? "dark" : ""}`}>
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-inter text-gray-900 dark:text-gray-100">

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <header className="text-center space-y-2">
          <button
  onClick={toggleDarkMode}
  className="fixed top-4 right-4 px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
>
  {darkMode ?  "🌙 ":" ☀️ " }
</button>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100  flex items-center justify-center gap-2">
            <Leaf className="text-green-600" size={32} />
            EcoTrack Simulator.AI
          </h1>
          <p className="text-gray-600 dark:text-gray-200 text-lg">
            Track habits, make choices, grow your eco-impact
          </p>
        </header>

        {/* Habit Tracker Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100  mb-4 flex items-center gap-2">
            <CheckCircle2 className="text-green-600" size={24} />
            Daily Eco Habits
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { key: "recycled", label: "Recycled", icon: Recycle },
              {
                key: "avoidedPlastic",
                label: "Avoided Plastic",
                icon: Package,
              },
              {
                key: "reusedContainers",
                label: "Reused Containers",
                icon: Package,
              },
              {
                key: "savedElectricity",
                label: "Saved Electricity",
                icon: Zap,
              },
              { key: "composted", label: "Composted", icon: Leaf },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => toggleHabit(key)}
                className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all duration-200 min-h-[44px] ${
                  habits[key]
                    ? "border-green-500 bg-green-50 text-green-800"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                }`}
                aria-pressed={habits[key]}
              >
                {habits[key] ? (
                  <CheckCircle2
                    className="text-green-600 flex-shrink-0"
                    size={20}
                  />
                ) : (
                  <Circle className="text-gray-400 flex-shrink-0" size={20} />
                )}
                <Icon className="flex-shrink-0" size={20} />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* EcoScore Card */}
        <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 ${houseState.bgColor}`}>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100  mb-4">EcoScore</h2>
          <div className="flex items-center justify-between mb-6">
            <div className="text-center">
              <div
                className={`text-5xl font-bold ${houseState.accentColor} transition-all duration-300 ${
    scorePop ? "animate-ecoscore-pop" : ""
  }`}
              >
                {ecoScore}
              </div>
              <div className="text-sm text-gray-500 font-medium">
                out of 100
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-2 transition-all duration-300">
                {houseState.emoji}
              </div>
              <div
                className={`text-sm font-semibold ${houseState.textColor} px-3 py-1 rounded-full ${houseState.bgColor} border ${houseState.accentColor}`}
              >
                {houseState.label}
              </div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
            <div
              className={`h-4 rounded-full transition-all duration-700 ease-out ${
                ecoScore >= 70
                  ? "bg-green-500"
                  : ecoScore >= 40
                  ? "bg-yellow-500"
                  : "bg-gray-400"
              }`}
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Wasteful</span>
            <span>Neutral</span>
            <span>Green</span>
          </div>
        </div>

        {/* Single Scenario Simulator Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100  mb-4">
            Eco Scenario Simulator
          </h2>

          {currentScenario ? (
            <div className="max-w-lg mx-auto">
              <div
  className={`relative bg-gray-50 dark:bg-gray-700 rounded-lg p-6 transition-opacity duration-300 ${
    isTransitioning ? "opacity-50" : "opacity-100"
  }`}
>
  {/* Sparkle animation on top of everything */}
  {showSparkle && (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center animate-sparkle z-20">
      <span className="text-yellow-300 text-5xl drop-shadow-lg">✨</span>
    </div>
  )}

    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 text-center">
      {currentScenario.scenario}
    </h3>

    <div className="flex flex-col sm:flex-row gap-3">

                  <button
                    onClick={() => handleScenarioChoice(true)}
                    disabled={isTransitioning}
                    className={`flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 min-h-[44px] ${
                      isTransitioning ? "" : "active:scale-95"
                    }`}
                  >
                    {currentScenario.sustainable}
                  </button>
                  <button
                    onClick={() => handleScenarioChoice(false)}
                    disabled={isTransitioning}
                    className={`flex-1 bg-gray-600 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 min-h-[44px] ${
                      isTransitioning ? "" : "active:scale-95"
                    }`}
                  >
                    {currentScenario.wasteful}
                  </button>
                </div>
              </div>

              {/* Scenario Counter */}
              {scenarioHistory.length > 0 && (
                <div className="text-center mt-4 text-sm text-gray-500">
                  Scenarios completed: {scenarioHistory.length}
                </div>
              )}
            </div>
          ) : (
            <div className="max-w-lg mx-auto">
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <p className="text-gray-500">Loading scenario...</p>
              </div>
            </div>
          )}
        </div>

        {/* AI Reflection Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100  mb-4">
            AI Reflection
          </h2>
          <div className="bg-blue-50 rounded-lg p-4 min-h-[80px] flex items-center">
            {aiReflection ? (
              <p className="text-gray-700 italic">{aiReflection}</p>
            ) : (
              <p className="text-gray-500 italic">
                Make a choice in the simulator above to see AI insights...
              </p>
            )}
          </div>
        </div>

        {/* Chart Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100  mb-4">
            7-Day EcoScore Trend
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                />
                <YAxis
                  domain={[0, 100]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#16A34A"
                  strokeWidth={3}
                  dot={{ fill: "#16A34A", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "#16A34A", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        .font-inter {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .bg-white {
          animation: fadeIn 0.3s ease-out;
        }
          @keyframes sparkle {
  0% { opacity: 0; transform: scale(0.5) rotate(0deg); }
  50% { opacity: 1; transform: scale(1.3) rotate(20deg); }
  100% { opacity: 0; transform: scale(0.5) rotate(0deg); }
}

.animate-sparkle {
  animation: sparkle 0.6s ease-out forwards;
}
@keyframes ecoscore-pop {
  0% { transform: scale(1); }
  35% { transform: scale(1.35); }
  70% { transform: scale(0.9); }
  100% { transform: scale(1); }
}

.animate-ecoscore-pop {
  animation: ecoscore-pop 0.3s ease-out;
}

      `}</style>
    </div>
    // </div>
  );
}