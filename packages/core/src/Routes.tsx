import React from "react";
import { Router, Route, Switch, Redirect } from "./components/Router";
import { useSelector, useDispatch } from "react-redux";
import {
  Splash,
  FindDoctor,
  ReservationCalendar,
  Login,
  DoctorCalendar,
  DoctorProfile,
  SessionDetail,
  PatientProfile,
  DoctorAvailablities
} from "./screens";
import { getUser } from "./api/user";
import { setPatientAction } from "./redux/actions/patientActions";
import { tokenSelector, userTypeSelector } from "./redux/selectors";
import { setDoctorAction } from "./redux/actions/doctorActions";
import NotificationHandler from "./components/NotificationHandler";

export default function Routes() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(true);
  const [needAuth, setNeedAuth] = React.useState(true);

  const accessToken = useSelector(tokenSelector);
  const userType = useSelector(userTypeSelector);

  React.useEffect(() => {
    async function auth() {
      try {
        setIsLoading(true);
        if (!accessToken) {
          throw new Error("access token not found");
        }
        const userProfile = await getUser(accessToken);
        if (userType === "doctor") {
          dispatch(setDoctorAction(userProfile.doctor));
        } else {
          dispatch(setPatientAction(userProfile.patient));
        }
        setNeedAuth(false);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.log({ error: error.message });
        setIsLoading(false);
        setNeedAuth(true);
      }
    }
    auth();
  }, [accessToken, dispatch]);

  return (
    <>
      <Router>
        <Switch>
          {isLoading ? (
            <>
              <Redirect from="*" to="/" />
              <Route exact path="/" component={Splash} />
            </>
          ) : needAuth ? (
            <>
              <Redirect from="*" to="/login" />
              <Route exact path="/login" component={Login} />
            </>
          ) : userType === "patient" ? (
            <>
              <Redirect from="*" to="/FindDoctor" />
              <Route exact path="/FindDoctor" component={FindDoctor} />
              <Route exact path="/ReservationCalendar" component={ReservationCalendar} />
              <Route exact path="/PatientProfile" component={PatientProfile} />
            </>
          ) : (
            <>
              <Redirect from="*" to="/DoctorCalendar" />
              <Route exact path="/DoctorCalendar" component={DoctorCalendar} />
              <Route exact path="/DoctorProfile" component={DoctorProfile} />
              <Route exact path="/DoctorAvailablities" component={DoctorAvailablities} />
              <Route exact path="/SessionDetail" component={SessionDetail} />
            </>
          )}
        </Switch>
      </Router>
      {!needAuth && <NotificationHandler />}
    </>
  );
}
