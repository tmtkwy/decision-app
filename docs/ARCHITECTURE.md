# 아키텍처

## Frontend

- Angular 22
- Standalone Components
- TypeScript
- Angular Signals

Angular의 현재 권장 방식을 우선적으로 사용한다.

프로젝트 규모가 작기 때문에
필요 이상의 아키텍처나 추상화를 도입하지 않는다.

## UI

- Material Design 3
- Material Web Components
- Tailwind CSS
- Responsive Design

Material Web Components는 주로
버튼, 입력 필드, 아이콘 버튼 등 인터랙티브한 UI 컴포넌트에 사용한다.

Tailwind CSS는 주로 다음과 같은 레이아웃 및 스타일링에 사용한다.

- 레이아웃
- 여백
- 크기
- 정렬
- 반응형 디자인
- 간단한 스타일링

Material Web Components와 Tailwind CSS의 역할을 불필요하게 중복시키지 않는다.

## 상태 관리

로컬 애플리케이션 상태에는 Angular Signals를 사용한다.

기본적으로 다음 API를 사용한다.

- `signal()`
- `computed()`
- `effect()` — 필요한 경우에만 사용

애플리케이션 규모가 커지고 명확한 필요성이 발생하기 전까지
NgRx 등의 별도 상태 관리 라이브러리를 도입하지 않는다.

## 데이터 저장

MVP에서는 백엔드를 필요로 하지 않는다.

애플리케이션의 기본 상태는 브라우저에서 관리한다.

사용자의 데이터를 브라우저에 지속적으로 저장해야 하는 기능이 추가되는 경우
LocalStorage를 우선적으로 검토한다.

기능상 명확한 필요성이 발생하기 전까지 다음을 도입하지 않는다.

- Spring Boot
- 데이터베이스
- 사용자 인증
- 외부 API

## 컴포넌트

AppComponent는 애플리케이션의 루트 컴포넌트로 사용한다.

AppComponent에 모든 UI와 비즈니스 로직을 집중시키지 않는다.

다음과 같은 경우 Standalone Component로 분리한다.

- UI 영역이 복잡해지는 경우
- 독립적인 책임을 가지는 경우
- 여러 곳에서 재사용되는 경우

단순한 UI까지 무조건 컴포넌트로 분리하는 과도한 컴포넌트화를 피한다.

## 서비스

다음과 같은 경우 Service를 도입한다.

- 비즈니스 로직이 여러 곳에서 재사용되는 경우
- 외부 통신이 필요한 경우
- Component의 로직이 지나치게 복잡해지는 경우
- Component와 분리했을 때 책임이 명확해지는 경우

단순한 몇 줄의 처리를 위해 무조건 Service를 생성하지 않는다.

## API 통신

MVP에서는 백엔드 API 통신을 사용하지 않는다.

향후 API 통신이 필요한 기능이 추가되는 경우
Angular의 HttpClient를 사용한다.

## 프로젝트 구조

프로젝트 규모가 작은 동안에는 현재 Angular 프로젝트 구조를 최대한 단순하게 유지한다.

필요한 경우 다음과 같은 구조를 사용할 수 있다.

```text
src/
├── app/
│   ├── components/
│   ├── services/
│   ├── models/
│   └── ...
├── styles.css
└── main.ts
```

단, 실제 코드 구조를 무조건 위와 같이 맞추기 위해
불필요한 디렉터리를 생성하지 않는다.

현재 프로젝트 구조와 Angular의 기본 구성을 우선적으로 존중한다.

## 아키텍처 원칙

- 단순한 문제에는 단순한 해결책을 사용한다.
- 작은 프로젝트에 대규모 아키텍처를 적용하지 않는다.
- 기능을 추가할 때 필요한 범위만 변경한다.
- 미래의 가능성만을 이유로 구조를 복잡하게 만들지 않는다.
- 현재 요구사항보다 과도하게 확장 가능한 구조를 만들지 않는다.
