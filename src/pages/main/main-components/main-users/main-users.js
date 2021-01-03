import React, { useContext, useEffect, useState } from 'react';
import UserService from '../../../../services/user';

import { MainContext } from '../../../../contexts/main/main';

const MainUsers = () => {
    const { setUser, user, accountId, setService } = useContext(MainContext);
    const [users, setUsers] = useState({});

    const handleChangeUser = (userId) => {
        setUser(users[userId] || {});
        setService({});
    };

    useEffect(() => {
        (async () => {
			if (!accountId) {
				return;
			}

            const { data } = await UserService.findAllByAccountId({
                account_id: accountId,
			});

			const userValues = Object.values(data.users);

			if (userValues.length === 1) {
				setUser(userValues[0]);
			}

            setUsers(data.users);
        })();
    }, [accountId, setUser]);

    return (
        <div className="card">
            <div className="card__header">
                <h2 className="card__title">Profissional</h2>
            </div>
            <div className="m-t-5">
                <select
                    value={user.id || ''}
					onChange={(event) => handleChangeUser(event.target.value)}
					className="select select--dark"
                >
                    <option>Selecione</option>
                    {Object.values(users).map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default MainUsers;