import React, { useState, useEffect } from 'react';

export default function AcademiaFrancesaApp() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [userData, setUserData] = useState({
    name: 'José Manuel',
    origin: 'Gran Canaria',
    destination: 'Senegal',
    level: 'A2',
    points: 0,
    completedLessons: [],
    currentDay: new Date().toISOString().split('T')[0]
  });
  const [currentLesson, setCurrentLesson] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('academiaData');
    if (saved) setUserData(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('academiaData', JSON.stringify(userData));
  }, [userData]);

  const allLessons = [
    {
      id: 1,
      week: 1,
      day: 'MIÉ 22',
      title: 'Saludos básicos',
      duration: '15 min',
      content: [
        { type: 'intro', text: '¡Hola José Manuel! Imagina que acabas de llegar a Dakar. Lo primero que harás es saludar. En Senegal, los saludos son MUY importantes.' },
        { type: 'lesson', title: 'Los 3 saludos esenciales:', items: [
          { fr: 'Bonjour', es: 'Hola / Buenos días', uso: 'Formal o casual' },
          { fr: 'Ça va?', es: '¿Cómo estás?', uso: 'Muy común en Senegal' },
          { fr: 'Ça va bien, et toi?', es: '¿Bien, y tú?', uso: 'Respuesta clásica' }
        ]}
      ],
      test: {
        question: '¿Cuál es la respuesta completa a "Ça va?"',
        options: [
          { text: 'Ça va bien, et toi?', correct: true, points: 10 },
          { text: 'Bien', correct: false, points: 0 },
          { text: 'Ça va', correct: false, points: 0 }
        ]
      }
    },
    {
      id: 2,
      week: 1,
      day: 'JUE 23',
      title: 'Tu presentación',
      duration: '15 min',
      content: [
        { type: 'intro', text: 'Perfecto, ya saludaste. Ahora necesitas presentarte. En Senegal quieren saber de dónde vienes y qué haces.' },
        { type: 'lesson', title: 'Frases clave:', items: [
          { fr: 'Je m\'appelle José Manuel', es: 'Me llamo José Manuel', uso: 'Presentación básica' },
          { fr: 'Je viens de Gran Canaria', es: 'Vengo de Gran Canaria', uso: 'Origen' },
          { fr: 'Je suis président d\'une association', es: 'Soy presidente de una asociación', uso: 'Tu rol' }
        ]}
      ],
      test: {
        question: 'Completa: "Je suis ___ d\'une association"',
        options: [
          { text: 'président', correct: true, points: 10 },
          { text: 'ingénieur', correct: false, points: 0 },
          { text: 'membre', correct: false, points: 0 }
        ]
      }
    },
    {
      id: 3,
      week: 1,
      day: 'VIE 24',
      title: 'Números y dinero',
      duration: '15 min',
      content: [
        { type: 'intro', text: 'En Senegal, la negociación es un ARTE. Necesitas números para entender precios.' },
        { type: 'lesson', title: 'Números 1-10:', items: [
          { fr: 'Un, Deux, Trois, Quatre, Cinq', es: '1, 2, 3, 4, 5', uso: 'Básicos' },
          { fr: 'Six, Sept, Huit, Neuf, Dix', es: '6, 7, 8, 9, 10', uso: 'Completar 1-10' }
        ]}
      ],
      test: {
        question: '¿Cómo se dice "diez" en francés?',
        options: [
          { text: 'Dix', correct: true, points: 10 },
          { text: 'Dez', correct: false, points: 0 },
          { text: 'Diez', correct: false, points: 0 }
        ]
      }
    },
    {
      id: 4,
      week: 2,
      day: 'LUN 27',
      title: 'En el hotel',
      duration: '20 min',
      content: [
        { type: 'intro', text: 'Llegas a Dakar. Necesitas un hotel. Aprendamos frases del hotel.' },
        { type: 'lesson', title: 'Frases hotel:', items: [
          { fr: 'Je voudrais une chambre', es: 'Quiero una habitación', uso: 'Reserva' },
          { fr: 'Pour combien de nuits?', es: '¿Para cuántas noches?', uso: 'Pregunta del recepcionista' },
          { fr: 'Une nuit', es: 'Una noche', uso: 'Respuesta' }
        ]}
      ],
      test: {
        question: '¿Cómo pides una habitación?',
        options: [
          { text: 'Je voudrais une chambre', correct: true, points: 10 },
          { text: 'Chambre, s\'il vous plaît', correct: false, points: 5 },
          { text: 'Une chambre', correct: false, points: 0 }
        ]
      }
    },
    {
      id: 5,
      week: 2,
      day: 'MAR 28',
      title: 'El mercado senegalés',
      duration: '20 min',
      content: [
        { type: 'intro', text: 'El mercado es el corazón de Senegal. Aquí negociarás, comprarás y conocerás gente.' },
        { type: 'lesson', title: 'En el mercado:', items: [
          { fr: 'Combien ça coûte?', es: '¿Cuánto cuesta?', uso: 'Preguntar precio' },
          { fr: 'C\'est trop cher', es: 'Es muy caro', uso: 'Para negociar' },
          { fr: 'Tu me fais un prix?', es: '¿Me haces rebaja?', uso: 'Negociar' }
        ]}
      ],
      test: {
        question: '¿Cómo preguntas el precio?',
        options: [
          { text: 'Combien ça coûte?', correct: true, points: 10 },
          { text: '¿Cuánto?', correct: false, points: 0 },
          { text: 'El precio?', correct: false, points: 0 }
        ]
      }
    }
  ];

  const completeLesson = (lessonId, points) => {
    setUserData(prev => ({
      ...prev,
      points: prev.points + points,
      completedLessons: [...new Set([...prev.completedLessons, lessonId])]
    }));
    setCurrentView('dashboard');
    alert(`✓ ¡LECCIÓN COMPLETADA! +${points} puntos`);
  };

  if (currentView === 'dashboard') {
    const completedCount = userData.completedLessons.length;
    const totalLessons = allLessons.length;
    const progressPercent = (completedCount / totalLessons) * 100;

    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={{ margin: '0 0 8px', fontSize: '24px', fontWeight: '600' }}>
            🌍 Academia Francesa
          </h1>
          <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
            Gran Canaria → Senegal 🇸🇳
          </p>
        </div>

        <div style={styles.profileCard}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <p style={{ margin: '0 0 4px', fontSize: '14px', color: '#666' }}>Hola,</p>
              <h2 style={{ margin: '0', fontSize: '20px', fontWeight: '600' }}>{userData.name}</h2>
            </div>
            <div style={{
              background: '#378ADD',
              color: 'white',
              padding: '12px 16px',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '28px', fontWeight: '600' }}>{userData.points}</div>
              <div style={{ fontSize: '12px' }}>Puntos</div>
            </div>
          </div>
        </div>

        <div style={styles.progressSection}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: '500' }}>Progreso</span>
            <span style={{ fontSize: '13px', color: '#666' }}>{completedCount}/{totalLessons}</span>
          </div>
          <div style={styles.progressBar}>
            <div style={{
