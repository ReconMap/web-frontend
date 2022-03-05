import { Input } from "@chakra-ui/react";
import PrimaryButton from "components/ui/buttons/Primary";
import { actionCompletedToast } from "components/ui/toast";
import { AuthContext } from 'contexts/AuthContext';
import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import secureApiFetch from "services/api";

const MfaVerification = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState('');
    const { setIsAuth } = useContext(AuthContext);

    const handleSubmit = ev => {
        ev.preventDefault();

        const body = { code: code };
        secureApiFetch('/auth/mfa-verification', { method: 'POST', body: JSON.stringify(body) })
            .then(data => data.json())
            .then(json => {
                localStorage.setItem('user', JSON.stringify(json));

                setIsAuth(true);
                navigate('/');
                actionCompletedToast(`2FA verified`);
            })
    }

    const onChange = ev => {
        setCode(ev.target.value);
    }

    return <section className="loginform">
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>Two-factor authentication</legend>
                <p>Enter the 6-digit code generated by your authentication app.</p>
                <label htmlFor="code">6-digit MFA code</label>
                <Input type="text" name="code" id="code" placeholder="6 digits code" pattern="[0-9]{6}" maxLength="6" value={code} onChange={onChange} autoFocus required />
                <PrimaryButton type="submit">Verify</PrimaryButton>
            </fieldset>
        </form>
    </section>
}

export default MfaVerification;
