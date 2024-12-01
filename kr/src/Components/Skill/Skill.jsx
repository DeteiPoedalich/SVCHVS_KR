import { useEffect, useState } from 'react';

const Skill = ({ skillId,className3} ) => {
    const [skill, setSkill] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!skillId) {
            console.error('Skill ID is not provided');
            setLoading(false);
            return;
        }
        
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/skill/${skillId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setSkill(data);
            } catch (error) {
                console.error("Ошибка при загрузке скилла:", error); // Исправлено сообщение об ошибке
                setError("Не удалось загрузить данные о скилле"); // Исправлено сообщение об ошибке
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [skillId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!skill) return <div>Skill not found</div>;
    const imageUrl = `http://localhost:5000/${skill.SkillImg}`;
    return (
        <div className={className3}>
            <img src={imageUrl} alt={skill.SkillName || "Skill"} /> 
        </div>
    );
};

export default Skill;