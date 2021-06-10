import { connect } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import { IncrementClickCount, IncrementClickCountAsync } from '../../actions/ClickCount';
import { Dispatch } from '../../actions/Helpers';
import { RootState } from '../../reducers';
import { ClickCounterComponent, Props } from './ClickCounterComponent';

// Props that are wired up to actions
// This could also be defined in the Component, if we don't mind leaking a little Container into the component
type DispatchProps = Pick<Props, 'onAsyncClick' | 'onClick'>;
type StateProps = Pick<Props, 'clickCount'>;

/**
 * Creates the set of props that are wired to dispatch
 * @param dispatch Action dispatcher
 */
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onClick: () => dispatch(IncrementClickCount(1)),
  onAsyncClick: () => dispatch(IncrementClickCountAsync(5))
});

/**
 * Creates the set of props that are populated from the redux state
 * @param state Root state
 */
const mapStateToProps = (state: RootState): StateProps => ({
  clickCount: state.clickCount.clickCount
});

/**
 * Redux connected ClickCounter
 * Wrapping with hot() is required for
 */
export const ClickCounterContainer = connect(mapStateToProps, mapDispatchToProps)(hot(ClickCounterComponent));
