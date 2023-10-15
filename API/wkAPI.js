

const apiURL = "https://api.wanikani.com/v2";
const token = process.env.EXPO_PUBLIC_API_KEY;
export const getSummary = async () => {
    try {
        const response = await fetch(
            apiURL + '/summary',
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                }
            }

        );
        const json = await response.json();
        return {
            lessonCount: json.data.lessons[0].subject_ids.length,
            reviewCount: json.data.reviews[0].subject_ids.length,
            reviewsAvailable: json.data.next_reviews_at,
            lessons: json.data.lessons[0].subject_ids,
            reviews: json.data.reviews[0].subject_ids,

        };
    } catch (error) {
        console.error("ERROR" + error);
    }
};

export const getUserInformation = async () => {
    try {
        const response = await fetch(
            apiURL + '/user/',
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                }
            }

        );
        const json = await response.json();
        //console.log(outJSON);
        return {
            username: json.data.username,
            level: json.data.level,
            startedAt: json.data.started_at,
            subscriptionActive: json.data.subscription.active,
            currentVacation: json.data.current_vacation_started_at,
        };
    } catch (error) {
        console.error(error);
    }
};

export const getCurrentLevelAssignments = async (level) => {
    try {
        const response = await fetch(
            apiURL + `/assignments?levels=${level}&subject_types=kanji,radical`,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                }
            }

        );
        const json = await response.json();
        return {
            count: json.totalCount,
            assignments: json.data,

        };
    } catch (error) {
        console.error(error);
    }
};

export const getSubjectsInformation = async (level) => {
    try {
        const response = await fetch(
            apiURL + `/subjects?levels=${level}&types=kanji,radical`,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                }
            }

        );
        const json = await response.json();
        const outJSON = []
        json.data.map((subject) =>{
            outJSON.push(
                {
                    type: subject.object,
                    characters: subject.data.characters,
                    meanings: subject.data.meanings,
                    readings:subject.data.readings,
                    id: subject.id
                }
            )
        })
        return outJSON
    } catch (error) {
        console.error(error);
    }
};
